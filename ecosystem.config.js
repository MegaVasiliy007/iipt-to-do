module.exports = {
    apps: [
        {
            name: 'front-todo',
            cwd: '/root/todo/client',
            script: './node_modules/nuxt/bin/nuxt.js',
            args: 'start',
            env: {
                NODE_ENV: 'production',
                NUXT_PORT: 3050
            }
        },
        {
            name: 'back-todo',
            cwd: '/root/todo/api',
            script: 'index.js',
            env: {
                NODE_ENV: 'production',
                PORT: 8050,
                dbhost: '127.0.0.1',
                dblogin: 'todo',
                dbpass: 'todo'
            }
        }
    ]
}