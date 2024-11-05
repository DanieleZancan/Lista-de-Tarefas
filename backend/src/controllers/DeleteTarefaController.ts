import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteTarefaService } from "../services/DeleteTarefaService";

class DeleteTarefaController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { id } = request.query as { id: string }

        const tarefaService =  new DeleteTarefaService();
        const tarefa = await tarefaService.execute({ id })

        reply.send(tarefa);
    }
}

export { DeleteTarefaController }