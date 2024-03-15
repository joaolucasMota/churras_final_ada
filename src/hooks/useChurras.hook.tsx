import { ReactNode, useEffect, useState } from "react";
import { deleteApi, getApi, postApi, putApi } from "../services/axios";
import Churrasco from "../utils/class";

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

const useChurras = () => {

    const [churras, setChurras] = useState({});
    const [infoChurras, setInfoChurras] = useState<IChurrasContext['infoChurras']>([]);

    console.log(infoChurras)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let resp = await getApi<IPeople>('peoples');
                setChurras(resp.data);
            } catch (error) {
                console.error(error)
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (churras && Object.keys(churras).length > 0) {
            calcularTotaisChurrasco(churras);
        }
    }, [churras]);

    const calcularTotaisChurrasco = (objetos: any) => {
        const resultados: IChurrasContext['infoChurras'] = [];

        objetos.forEach((obj: any) => {
            const churrascoDoFimDeSemana = new Churrasco(obj.homens, obj.mulheres, obj.criancas);
            const totalChurrasco = churrascoDoFimDeSemana.calcularTodos();
            resultados.push({
                id: obj.id,
                ...totalChurrasco
            });
        });
        setInfoChurras(resultados);
    };

    const deleteChurrasco = async (id: number) => {
        try {
            await deleteApi(`peoples/${id}`);

        } catch (error) {
            console.error('Erro ao excluir churrasco:', error);
        }
    };

    const addPerson = async (data: any) => {
        try {
            const response = await postApi('peoples', data);
            console.log('Resposta do backend:', response.data);
        } catch (error) {
            console.error('Erro ao adicionar pessoa:', error);
        }
    };

    const editChurrasco = async (id: number, newData: any) => {
        try {
            await putApi(`peoples/${id}`, newData);
        } catch (error) {
            console.error('Erro ao editar churrasco:', error);
        }
    };

    return{
        editChurrasco,
        addPerson,
        deleteChurrasco
    }
}

export {useChurras};