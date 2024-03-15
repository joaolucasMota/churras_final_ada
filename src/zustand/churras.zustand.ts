import {create} from 'zustand';
import {deleteApi, postApi, putApi} from '../services/axios';
import {ReactNode} from 'react'

interface IChurrasContext {
  churras: object;
  setChurras: (churras: object) => void;
  infoChurras: {
    id: null | undefined;
    totalAdultos: ReactNode;
    totalPessoas: ReactNode;
    totalPaoDeAlho: ReactNode;
    totalCarvao: ReactNode;
    totalCarne: any;
    totalCerveja: ReactNode;
    totalRefrigerante: ReactNode;
    data: ReactNode;
    parametrosEdit: ReactNode;
  }[];
  addPerson: (data: any) => Promise<void>;
  deleteChurrasco: (id: number) => Promise<void>;
  editChurrasco: (id: number, newData: any) => Promise<void>;
}

const useChurras = create<IChurrasContext>((set) => ({
  churras: {},
  setChurras: (churras) => set((state) => ({...state, churras})),
  infoChurras: [],
  addPerson: async (data) => {
    try {
      const response = await postApi('peoples', data);
      console.log('Resposta do backend:', response.data);
    } catch (error) {
      console.error('Erro ao adicionar pessoa:', error);
    }
  },
  deleteChurrasco: async (id) => {
    try {
      await deleteApi(`peoples/${id}`);
    } catch (error) {
      console.error('Erro ao excluir churrasco:', error);
    }
  },
  editChurrasco: async (id, newData) => {
    try {
      await putApi(`peoples/${id}`, newData);
    } catch (error) {
      console.error('Erro ao editar churrasco:', error);
    }
  },
}));

export default useChurras;