import prismaClient from "../prisma";

interface EditTarefaProps {
    id: string; 
    nomeTarefa: string;
    custo: number;
    dataLimite: Date;
}

class EditTarefaService {
    async execute({ id, nomeTarefa, custo, dataLimite }: EditTarefaProps) {

        console.log({ id, nomeTarefa, custo, dataLimite })
        
        if (!id) {
            throw new Error("Solicitação inválida!");
        }
    
        if (!nomeTarefa || custo === undefined || !dataLimite) {
            throw new Error("Pelo menos um campo a ser atualizado deve ser fornecido!");
        }

        // Verifica se a tarefa existe
        const tarefaExistente = await prismaClient.tarefa.findUnique({
            where: { id }
        });

        if (!tarefaExistente) {
            throw new Error("Tarefa não encontrada!");
        }

        // Atualiza a tarefa
        const tarefaAtualizada = await prismaClient.tarefa.update({
            where: { id },
            data: {
                nomeTarefa: nomeTarefa || tarefaExistente.nomeTarefa,
                custo: custo !== undefined ? custo : tarefaExistente.custo,
                dataLimite: dataLimite || tarefaExistente.dataLimite,
            }
        });

        return tarefaAtualizada;
    }
}

export { EditTarefaService };


