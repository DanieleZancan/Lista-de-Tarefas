import prismaClient from "../prisma";

class ListTarefasService{
    async execute(){
        const tarefas = await prismaClient.tarefa.findMany()

        return tarefas;
    }
}

export { ListTarefasService }