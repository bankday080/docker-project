const fastify = require('fastify')

const app = fastify({
    logger: true
})

app.get('/', async () => {
    return {
        status: 'OK'
    }
})

app.listen(3000, '0.0.0.0')