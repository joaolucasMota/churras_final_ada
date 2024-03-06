import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000/';

export const postApi = (url: string, data: any) => {
    return axios.post(`${BASE_URL}${url}`, data);
}

export const getApi = async <T>(url: string): Promise<AxiosResponse<T>> => {
    return axios.get(`${BASE_URL}${url}`);
}

export const putApi = (url: string, data: any) => {
    return axios.put(`${BASE_URL}${url}`, data);
}

export const deleteApi = (url: string) => {
    return axios.delete(`${BASE_URL}${url}`);
}

export const patchApi = (url: string, data: any) => {
    return axios.patch(`${BASE_URL}${url}`, data);
}
