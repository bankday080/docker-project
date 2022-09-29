const fastify = require('fastify')

const nodeEnv = process.env.NODE_ENV || 'development'

const app = fastify({
    logger: true
})

app.get('/', async () => {
    return {
        status: 'OK',
        nodeEnv
    }
})

app.listen(3000, '0.0.0.0')