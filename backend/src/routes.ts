import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateTarefaController } from "./controllers/CreateTarefaController";
import { ListTarefasController } from "./controllers/ListTarefasController";
import { DeleteTarefaController } from "./controllers/DeleteTarefaController";
import { EditTarefaController } from "./controllers/EditTarefaController";
import { ReorderTarefasController } from "./controllers/ReorderTarefasController";
import { EditTarefaRequestBody } from "./controllers/EditTarefaController";

export default async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    // Adicionar nova tarefa
    fastify.post("/tarefa", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateTarefaController().handle(request, reply)
    })   

    // Listar todas as tarefas
    fastify.get("/tarefas", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListTarefasController().handle(request, reply)
    }) 

    // Deletar tarefa
    fastify.delete("/tarefa", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteTarefaController().handle(request, reply)
    }) 

    // Editar tarefa
    const editTarefaController = new EditTarefaController();

    fastify.put<{ Params: { id: string }; Body: EditTarefaRequestBody }>(
        '/tarefa/:id',
        async (request, reply) => {
            return editTarefaController.handle(request, reply);
        }
    );
    
    fastify.put("/tarefa/reorder", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ReorderTarefasController().handle(request, reply)
    }) 

}

export { routes }