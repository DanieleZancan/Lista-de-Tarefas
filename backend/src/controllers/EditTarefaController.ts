import { FastifyRequest, FastifyReply } from "fastify";
import { EditTarefaService } from "../services/EditTarefaService";


class EditTarefaController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id, nomeTarefa, custo, dataLimite } = request.query as { id: string, nomeTarefa: string, custo: number, dataLimite: Date }

        const tarefaService = new EditTarefaService();
        const tarefa = await tarefaService.execute({ id, nomeTarefa, custo, dataLimite });

        reply.send(tarefa);
    }
}

export { EditTarefaController };
