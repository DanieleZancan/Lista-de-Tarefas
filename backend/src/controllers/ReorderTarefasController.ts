import { FastifyRequest, FastifyReply } from "fastify";
import { ReorderTarefasService } from "../services/ReorderTarefasService";

class ReorderTarefasController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id, novaOrdem } = request.body as { id: string; novaOrdem: number };

        const reorderService = new ReorderTarefasService();
        const result = await reorderService.execute({ id, novaOrdem });

        reply.send(result);
    }
}

export { ReorderTarefasController };
