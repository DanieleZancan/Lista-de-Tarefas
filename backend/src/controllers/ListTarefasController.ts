import { FastifyRequest, FastifyReply } from "fastify";
import { ListTarefasService } from "../services/ListTarefasService";

class ListTarefasController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const listTarefaService = new ListTarefasService();
        const tarefas = await listTarefaService.execute();

        reply.send(tarefas);
    }
}

export { ListTarefasController }