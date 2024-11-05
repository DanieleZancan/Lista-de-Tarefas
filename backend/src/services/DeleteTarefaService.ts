import prismaClient from "../prisma";

interface DeleteTarefaProps{
    id: string;
}

class DeleteTarefaService{
    async execute({ id }: DeleteTarefaProps){

        if(!id){
            throw new Error("Solicitação inválida!")
        }

        const findTarefa = await prismaClient.tarefa.findFirst({
            where:{
                id: id
            }
        })

        if(!findTarefa){
            throw new Error("Tarefa não encontrada!")
        }

        await prismaClient.tarefa.delete({
            where:{
                id: findTarefa.id
            }
        })

        return { message: "Deletado com sucesso!" }
    }
}

export { DeleteTarefaService }