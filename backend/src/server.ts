import Fastify from 'fastify';
import { routes } from './routes';
import cors from '@fastify/cors';
import { error } from 'console';
import { request } from 'http';

const app = Fastify({ logger: true })

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message})
})

const start = async () => {

    await app.register(cors);
    await app.register(routes);

    try{
        await app.listen({ port: 3333})
    }catch(err){
        process.exit(1)
    }
}

start();