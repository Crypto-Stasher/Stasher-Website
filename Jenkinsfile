// Jenkins pipeline for Stasher-Website.
// Flow: build the prerendered static site in a clean container, ship the release to the
// Hetzner prod box as the unprivileged `deploy` user, flip the `current` symlink via
// deploy.sh, health-check the live site, and auto-roll-back on failure.
//
// Prereqs on the Jenkins host:
//   - Docker available (build agent). Plugins: Docker Pipeline, SSH Agent, Git.
//   - Credential id `stasher-deploy-key`: SSH private key for deploy@prod (username: deploy).
// Prereqs on prod: `deploy` user owns /var/www/stasher; bin/deploy.sh + bin/rollback.sh present.

pipeline {
  agent none

  options {
    timestamps()
    disableConcurrentBuilds()          // never two deploys at once
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }

  environment {
    DEPLOY_HOST = '204.168.246.198'
    DEPLOY_USER = 'deploy2'
    DEPLOY_BASE = '/var/www/stasher'
    SITE_URL    = 'https://stasherwallet.com'
    SSH_OPTS    = '-o StrictHostKeyChecking=accept-new'
  }

  stages {
    stage('Build') {
      agent { docker { image 'node:22' } }
      steps {
        sh 'npm ci'
        sh 'npm run build:static'              // tsc + vite build + vike prerender
        sh 'test -f dist/client/index.html'    // fail fast if prerender produced no HTML
        stash name: 'site', includes: 'dist/client/**'
      }
    }

    stage('Deploy') {
      agent any
      steps {
        unstash 'site'
        script {
          def sha = (env.GIT_COMMIT ?: '').take(7)
          env.RELEASE = "${env.BUILD_NUMBER}-${sha ?: 'manual'}"
        }
        sshagent(['stasher-deploy-key']) {
          sh '''
            set -eu
            REL="$DEPLOY_BASE/releases/$RELEASE"
            ssh $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "mkdir -p '$REL'"
            # Stream the built site to the new release dir (tar over ssh; no rsync needed).
            tar -C dist/client -cf - . | ssh $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "tar -C '$REL' -xf -"
            # Atomic swap + prune on the box.
            ssh $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "bash '$DEPLOY_BASE/bin/deploy.sh' '$RELEASE'"
          '''
        }
        // Mark that prod was actually changed, so post-failure knows a rollback is valid.
        script { env.DEPLOYED = '1' }
      }
    }

    stage('Health check') {
      agent any
      steps {
        sshagent(['stasher-deploy-key']) {
          sh '''
            set -eu
            code=$(ssh $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "curl -s -o /dev/null -w '%{http_code}' '$SITE_URL'")
            echo "HTTP $code from $SITE_URL"
            test "$code" = "200"
          '''
        }
      }
    }
  }

  post {
    failure {
      script {
        // Only roll back if we already swapped prod (deploy succeeded but a later stage failed).
        // A build failure leaves prod untouched — don't revert a healthy release.
        if (env.DEPLOYED == '1') {
          sshagent(['stasher-deploy-key']) {
            sh '''
              set +e
              echo "post-deploy failure — rolling prod back"
              ssh $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "bash '$DEPLOY_BASE/bin/rollback.sh'"
            '''
          }
        } else {
          echo 'build failed before deploy — prod untouched, no rollback needed'
        }
      }
    }
  }
}
