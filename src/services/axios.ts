import axios, { AxiosResponse } from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

export const postApi = (url: string, data: any) => {
    return api.post(url, data)
}

export const getApi = async <T>(url: string): Promise<AxiosResponse<T, any>> => {
    return api.get(url)
}

export const putApi = (url: string, data: any) => {
    return axios.put(url, data)
}

export const deleteApi = (url: string) => {
    return axios.delete(url)
}

export const patchApi = (url: string, data: any) => {
    return axios.patch(url, data)
}