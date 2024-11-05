import prismaClient from "../prisma";

interface ReorderTarefasProps {
    id: string;
    novaOrdem: number;
}

class ReorderTarefasService {
    async execute({ id, novaOrdem }: ReorderTarefasProps) {
        const tarefa = await prismaClient.tarefa.findUnique({
            where: { id },
        });

        if (!tarefa) {
            throw new Error("Tarefa não encontrada.");
        }

        const tarefas = await prismaClient.tarefa.findMany();
        const tarefasOrdenadas = tarefas.sort((a, b) => a.ordemApresentacao - b.ordemApresentacao);

        if (novaOrdem < 1 || novaOrdem > tarefas.length) {
            throw new Error("Ordem de apresentação inválida.");
        }

        // Lógica para reordenar tarefas
        tarefasOrdenadas.forEach((tarefa, index) => {
            const novaOrdemAtualizada = index + 1;
            prismaClient.tarefa.update({
                where: { id: tarefa.id },
                data: { ordemApresentacao: novaOrdemAtualizada },
            });
        });

        await prismaClient.tarefa.update({
            where: { id },
            data: { ordemApresentacao: novaOrdem },
        });

        return { message: "Ordem de apresentação atualizada com sucesso!" };
    }
}

export { ReorderTarefasService };
