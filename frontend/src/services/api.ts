import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:3333"
});

export async function editTarefa(id: string, data: any){
    const response = await api.put('/tarefa/${id}', data);
    return response.data;
}

export default api;