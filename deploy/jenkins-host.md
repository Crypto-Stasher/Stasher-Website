# Promoting Jenkins from the lab to a Hetzner VM

The pipeline currently runs on a local Docker lab (`~/jenkins-lab`). This doc covers
standing up a **dedicated Hetzner Cloud VM** for Jenkins — separate from the prod web box
— and reproducing the working config. Closes WEB-9; enables the real webhook (WEB-14).

Why a separate VM (not the prod box): a CI server runs arbitrary build code. Keep that
blast radius **off** the box that serves stasherwallet.com. Jenkins reaches prod only as
the unprivileged `deploy2` user over SSH.

---

## 1. Provision the VM

Hetzner Cloud → new server, **separate from the prod box**:
- Type: CX22/CX23 is plenty (2 vCPU / 4 GB).
- Image: Ubuntu 24.04.
- Add your personal SSH key at create time (so you get in without the rescue dance).
- Give it a DNS name, e.g. `ci.stasherwallet.com` → its IP (needed for TLS + webhooks).

## 2. Firewall

Expose as little as possible. Hetzner Cloud Firewall (or `ufw`):
- **22/tcp** — SSH (ideally restrict to your IP).
- **443/tcp** — Jenkins UI via HTTPS reverse proxy.
- **80/tcp** — only for the certbot HTTP-01 challenge.
- **Do NOT** expose 8080 (Jenkins) or 50000 publicly — they sit behind nginx.

Outbound: the VM must reach **prod:22** (to deploy) and GitHub:443 (to clone).

## 3. Rootless Docker (build isolation without host-root)

The build runs in a `node:22` container (`agent { docker {...} }`). On the lab we mounted
the host docker socket — fine for a throwaway box, but on a real CI host that's a path to
**root on the host**. Use **rootless Docker** instead: container isolation, no root socket.

```bash
# as a dedicated 'jenkins' OS user (not root)
sudo apt-get install -y uidmap dbus-user-session
curl -fsSL https://get.docker.com/rootless | sh
# follow the printed instructions to set DOCKER_HOST + enable lingering:
loginctl enable-linger jenkins
export DOCKER_HOST=unix:///run/user/$(id -u)/docker.sock
```
Point Jenkins at this rootless socket. Build containers are isolated; a compromised build
can't trivially own the host.

> Alternative if rootless is fussy: use the **NodeJS tool** plugin (build directly on an
> agent, no Docker). Simpler, but less hermetic — your call. The Jenkinsfile currently
> assumes a Docker build agent.

## 4. Install Jenkins + nginx + TLS

Reuse the lab pattern, but with **real** Let's Encrypt TLS (the public DNS name makes
HTTP-01 work — unlike the lab's `tls internal`/mkcert):

- Run Jenkins (Docker `jenkins/jenkins:lts-jdk21` + the `docker-cli` Dockerfile, or native).
- nginx reverse-proxy `ci.stasherwallet.com` → `jenkins:8080` (same proxy config as the lab,
  with the websocket headers).
- `certbot --nginx -d ci.stasherwallet.com` for a trusted cert.
- Persist `JENKINS_HOME` on a volume; **back it up** (jobs, credentials, config live here).

## 5. Harden

- Set a strong admin user; **disable signup** (Configure Global Security → don't allow users
  to sign up).
- Keep Jenkins LTS + plugins patched (security advisories are frequent).
- Never build untrusted fork PRs on this host.
- Restrict who can configure jobs / run script console.

## 6. Reproduce the pipeline config

Install plugins: **Docker Pipeline**, **SSH Agent**, **Git**, **Mailer**.

Credentials (Manage Jenkins → Credentials):
- `stasher-deploy-key` — SSH private key for `deploy2@prod` (the `~/.ssh/jenkins_deploy`
  pair; its public half is already in `deploy2`'s `authorized_keys` on prod).
- GitHub token — fine-grained, **Contents: Read-only** on `Stasher-Website`, for cloning.

Job: **Pipeline from SCM** → repo `https://github.com/Crypto-Stasher/Stasher-Website.git`,
branch `*/main`, Script Path `Jenkinsfile`.

SMTP: Manage Jenkins → System → E-mail Notification (for WEB-13 notifications) + System
Admin e-mail.

## 7. Real GitHub webhook (WEB-14)

Now that Jenkins is publicly reachable over HTTPS, no ngrok needed:
- Job → enable **GitHub hook trigger for GITScm polling**.
- GitHub repo → Settings → Webhooks → Add:
  - Payload URL: `https://ci.stasherwallet.com/github-webhook/`
  - Content type: `application/json`
  - Secret: a shared secret, also stored in Jenkins.
  - Events: Just the push event.
- Push to `main` → GitHub calls the webhook → Jenkins builds + deploys automatically.

## 8. Cut over from the lab

- Verify a manual **Build Now** on the VM deploys to prod green (same as the lab run).
- Confirm the webhook fires on a real push.
- Decommission the lab job (or keep it for experiments — but only one thing should deploy
  prod on push, to avoid double deploys).

## Verify checklist

- [ ] VM reachable at `https://ci.stasherwallet.com` with a trusted cert.
- [ ] 8080/50000 not publicly exposed.
- [ ] Build runs in a container via rootless Docker.
- [ ] `Build Now` deploys to prod, health check 200.
- [ ] Failure e-mail arrives; auto-rollback works.
- [ ] Push to `main` triggers a build via webhook.
- [ ] `JENKINS_HOME` is backed up.
