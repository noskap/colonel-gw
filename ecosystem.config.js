module.exports = {
  apps: [{
    name: 'discord-webhook-messenger',
    script: 'npm run prod',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};