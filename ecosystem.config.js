module.exports = {
  apps : [{
    name      : 'wan_server',
    script    : './src/server/index.js',
    node_args : "-r esm --harmony --trace-deprecation --max_old_space_size=512",

  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
