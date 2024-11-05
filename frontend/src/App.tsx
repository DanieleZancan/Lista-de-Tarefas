import { useEffect, useRef, FormEvent, useState } from "react";
import { FiTrash, FiEdit } from "react-icons/fi";
import { api } from "./services/api";

interface TarefaProps {
    id: string;
    nomeTarefa: string;
    custo: number;
    dataLimite: Date;
}

export default function App() {
    const [tarefas, setTarefas] = useState<TarefaProps[]>([]);
    const [tarefaEditando, setTarefaEditando] = useState<TarefaProps | null>(null);
    const [orderBy, setOrderBy] = useState<'nomeTarefa' | 'custo' | 'dataLimite'>('nomeTarefa');
    const nomeTarefaRef = useRef<HTMLInputElement | null>(null);
    const custoRef = useRef<HTMLInputElement | null>(null);
    const dataLimiteRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        loadTarefas();
    }, []);

    async function loadTarefas() {
        const response = await api.get("/tarefas");
        setTarefas(response.data);
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (!nomeTarefaRef.current?.value || !custoRef.current?.value || !dataLimiteRef.current?.value)
            return;

        if (tarefaEditando) {
            const response = await api.put(`/tarefa/${tarefaEditando.id}`, {
                id: tarefaEditando.id,
                nomeTarefa: nomeTarefaRef.current.value,
                custo: parseFloat(custoRef.current.value),
                dataLimite: new Date(dataLimiteRef.current.value),
            });

            setTarefas((prevTarefas) =>
                prevTarefas.map((tarefa) =>
                    tarefa.id === tarefaEditando.id ? response.data : tarefa
                )
            );
        } else {
            const response = await api.post("/tarefa", {
                nomeTarefa: nomeTarefaRef.current.value,
                custo: parseFloat(custoRef.current.value),
                dataLimite: new Date(dataLimiteRef.current.value),
            });

            setTarefas((allTarefas) => [...allTarefas, response.data]);
        }

        setTarefaEditando(null);
        nomeTarefaRef.current.value = "";
        custoRef.current.value = "";
        dataLimiteRef.current.value = "";
    }

    async function handleDelete(id: string) {
        try {
            await api.delete("/tarefa", {
                params: {
                    id: id,
                }
            });

            setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
        } catch (err) {
            console.log("Erro ao excluir a tarefa:", err);
        }
    }

    async function handleEdit(tarefa: TarefaProps) {
        setTarefaEditando(tarefa);

        if (nomeTarefaRef.current) nomeTarefaRef.current.value = tarefa.nomeTarefa;
        if (custoRef.current) custoRef.current.value = tarefa.custo.toString();
        if (dataLimiteRef.current) dataLimiteRef.current.value = new Date(tarefa.dataLimite).toISOString().split('T')[0];
    }

    // Função para ordenar as tarefas com base no estado `orderBy`
    const sortedTarefas = [...tarefas].sort((a, b) => {
        if (orderBy === "nomeTarefa") {
            return a.nomeTarefa.localeCompare(b.nomeTarefa);
        } else if (orderBy === "custo") {
            return a.custo - b.custo;
        } else if (orderBy === "dataLimite") {
            return new Date(a.dataLimite).getTime() - new Date(b.dataLimite).getTime();
        }
        return 0;
    });

    return (
        <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
            <main className="my-10 w-full md:max-w-2xl">
                <h1 className="text-4xl font-bold text-white text-center">LISTA DE TAREFAS</h1>

                <form className="flex flex-col my-6" onSubmit={handleSubmit}>
                    <label className="font-medium text-white">NOME DA TAREFA:</label>
                    <input type="text" placeholder="Digite o nome da tarefa..." className="w-full mb-5 p-2 rounded" ref={nomeTarefaRef} />

                    <label className="font-medium text-white">CUSTO:</label>
                    <input type="number" placeholder="Digite o custo da tarefa..." className="w-full mb-5 p-2 rounded" ref={custoRef} />

                    <label className="font-medium text-white">DATA LIMITE:</label>
                    <input type="date" className="w-full mb-5 p-2 rounded" ref={dataLimiteRef} />

                    <input type="submit" value={tarefaEditando ? "Salvar alterações" : "Cadastrar nova tarefa!"} className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium mb-4" />

                    <div className="mb-4">
                        <div className="flex items-center gap-2">
                            <label className="font-medium text-white">Ordenar por:</label>
                            <select
                                value={orderBy}
                                onChange={(e) => setOrderBy(e.target.value as 'nomeTarefa' | 'custo' | 'dataLimite')}
                                className="cursor-pointer p-2 bg-green-500 text-white font-medium rounded shadow-md transition-all duration-200 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                            >
                                <option value="nomeTarefa">Nome da Tarefa</option>
                                <option value="custo">Custo</option>
                                <option value="dataLimite">Data Limite</option>
                            </select>
                        </div>
                    </div>
                </form>

                <section className="flex flex-col gap-4">
                    {sortedTarefas.map((tarefa) => (
                        <article key={tarefa.id} className={`w-full rounded p-2 relative hover:scale-105 duration-200 ${tarefa.custo >= 1000 ? "bg-green-500" : "bg-white"}`}>
                            <p><span className="font-medium">Nome da tarefa:</span> {tarefa.nomeTarefa}</p>
                            <p><span className="font-medium">Custo:</span> {tarefa.custo.toFixed(2)}</p>
                            <p><span className="font-medium">Data limite da entrega:</span> {new Date(tarefa.dataLimite).toLocaleDateString()}</p>

                            <button className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2" onClick={() => handleDelete(tarefa.id)}>
                                <FiTrash size={18} color="#FFF" />
                            </button>

                            <button className="bg-blue-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-8 -top-2" onClick={() => handleEdit(tarefa)}>
                                <FiEdit size={18} color="#FFF" />
                            </button>
                        </article>
                    ))}
                </section>
            </main>
        </div>
    );
}
