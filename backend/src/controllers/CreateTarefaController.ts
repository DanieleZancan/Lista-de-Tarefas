import { FastifyRequest, FastifyReply } from "fastify";
import { CreateTarefaService } from "../services/CreateTarefaService";

class CreateTarefaController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { nomeTarefa, custo, dataLimite } = request.body as { nomeTarefa: string, custo: number, dataLimite: Date };
        

        const tarefaService = new CreateTarefaService()
        const tarefa = await tarefaService.execute({ nomeTarefa, custo, dataLimite });

        reply.send(tarefa)
    }
}

export { CreateTarefaController }