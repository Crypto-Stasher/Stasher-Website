# Deployment

Production: **Hetzner** box (`stasherwallet.com`), served by **nginx** as static files.
The site is a Vike app built with `prerender: true`, so it ships as static HTML/JS/CSS —
no Node process runs in production.

CI/CD: **Jenkins** (see [`../Jenkinsfile`](../Jenkinsfile)). On push to `main`, Jenkins
builds the static site, rsyncs it to the box as a new *release*, and atomically flips the
`current` symlink. nginx serves whatever `current` points at.

## Prod layout

```
/var/www/stasher/
  releases/<build>/    # one dir per deploy = prerendered dist/client output
  current -> releases/<build>   # symlink nginx serves
  bin/deploy.sh        # atomic swap + prune (run on the box)
  bin/rollback.sh      # revert current -> previous release
  .previous            # path of the release that was live before the last swap
```

nginx (`/etc/nginx/sites-available/stasher`): `root /var/www/stasher/current;`
See [`nginx/stasher.conf`](nginx/stasher.conf) for the tracked copy of the server block.

## The pipeline (Jenkinsfile)

1. **Build** — `npm ci` + `npm run build:static` (`tsc` + `vite build` + `vike prerender`)
   in a clean `node:22` container. Fails if no `dist/client/index.html` is produced.
2. **Deploy** — rsync `dist/client/` to `releases/<build>/` on the box, then run
   `bin/deploy.sh <build>` to swap `current`.
3. **Health check** — `curl` the live site, expect `200` + page marker.
4. **On failure** — run `bin/rollback.sh` on the box.

Build runs on the Jenkins host (on-prem), not third-party cloud. Prod only receives the
built artifact over a scoped SSH connection as the unprivileged `deploy2` user.

## Triggering

The job builds the `main` branch. Today it's started manually (**Build Now**) or by
**Poll SCM**. A real **GitHub webhook → Jenkins** (push to `main` auto-deploys) is deferred
until Jenkins moves to a public Hetzner VM — the local lab Jenkins isn't reachable from
GitHub without a tunnel (ngrok). See `jenkins-host.md` (TODO) for the webhook setup on the VM.

## Notifications

On failure the pipeline e-mails `NOTIFY_EMAIL` (set in the Jenkinsfile) and, if prod was
already swapped, auto-rolls-back. A recovery e-mail is sent on the first green build after
a failure. Requires SMTP configured in **Manage Jenkins → System → E-mail Notification**
plus a **System Admin e-mail address** (used as the From).

## One-time prod setup

```bash
# Dedicated, unprivileged deploy user that owns the web dir. (We named ours `deploy2`.)
adduser --disabled-password --gecos "" deploy2
chown -R deploy2:deploy2 /var/www/stasher

# Jenkins' public key goes here so it can SSH in as deploy2.
install -d -m 700 -o deploy2 -g deploy2 /home/deploy2/.ssh
# append Jenkins deploy pubkey to /home/deploy2/.ssh/authorized_keys (mode 600)
```

The symlink swap needs no root: nginx already follows `current`, so `deploy` never needs
sudo. (If you later want a hard `nginx -s reload`, grant a narrow sudoers rule for just
that command.)

## Manual operations

```bash
# Roll back to the previous release right now:
ssh deploy2@stasherwallet.com 'bash /var/www/stasher/bin/rollback.sh'

# List releases (newest first):
ssh deploy2@stasherwallet.com 'ls -1dt /var/www/stasher/releases/*/'
```

Old releases are pruned automatically, keeping the last 5 (`STASHER_KEEP`).
