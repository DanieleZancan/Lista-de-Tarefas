import prismaClient from "../prisma";

interface CreateTarefaProps{
    nomeTarefa: string;
    custo: number;
    dataLimite: Date;
}

class CreateTarefaService{
    async execute({ nomeTarefa, custo, dataLimite }: CreateTarefaProps){
        
        if(!nomeTarefa || typeof custo !== 'number' || !dataLimite){
            throw new Error("Preencha todos os campos corretamente!")
        }

        const lastTarefa = await prismaClient.tarefa.findFirst({
            orderBy: {
                ordemApresentacao: 'desc'
            },
        });

        const ordemApresentacao = lastTarefa ? lastTarefa.ordemApresentacao + 1 : 1;

        const tarefa = await prismaClient.tarefa.create({
            data:{
                nomeTarefa,
                custo: custo,
                dataLimite,
                ordemApresentacao,
            }
        })

        return tarefa
    }
}

export { CreateTarefaService }