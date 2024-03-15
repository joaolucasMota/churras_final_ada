import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { deleteApi, getApi, postApi, putApi } from "../services/axios";
import Churrasco from "../utils/class";
import { bool, boolean } from "yup";

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
    deleteChurrasco: (id: string) => Promise<void>;
    editChurrasco: (id: string, newData: any) => Promise<void>;
    getChurrascoById: (id: string) => Promise<any>;
    churrascoEditado : boolean;
}

const LOADING_CONTEXT_DEFAULT_VALUE: IChurrasContext = {
    churras: {},
    setChurras: () => null,
    infoChurras: [],
    addPerson: () => Promise.resolve(),
    deleteChurrasco: () => Promise.resolve(),
    editChurrasco: () => Promise.resolve(),
    getChurrascoById: () => Promise.resolve(),
    churrascoEditado: false
}

const ChurrasContext = createContext<IChurrasContext>(LOADING_CONTEXT_DEFAULT_VALUE);

interface IChurrasProvider {
    children: React.ReactNode;
}



const ChurrasProvider = ({ children }: IChurrasProvider) => {

    const [churras, setChurras] = useState({});
    const [infoChurras, setInfoChurras] = useState<IChurrasContext['infoChurras']>([]);
    const [churrascoEditado, setChurrascoEditado] = useState(false);

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
        if (churrascoEditado) {
            fetchData(); // Chamando a função fetchData quando churrascoEditado mudar
            setChurrascoEditado(false); // Resetando churrascoEditado para false após a requisição
        }
    }, [churrascoEditado]);

    useEffect(() => {
        if (churras && Object.keys(churras).length > 0) {
            calcularTotaisChurrasco(churras);
        }
    }, [churras]);

    const getChurrascoById = async (id: string) => {
        try {
            const response = await getApi(`peoples/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter churrasco:', error);
            throw error; // Propagar o erro para o chamador
        }
    };

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

    const deleteChurrasco = async (id: string) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/peoples/${id}`, {
                method: 'DELETE'
            });
    
            if (!response.ok) {
                throw new Error('Erro ao excluir churrasco');
            }
    
            console.log(`Churrasco com ID ${id} excluído com sucesso`);
            setChurrascoEditado(true);
        } catch (error) {
            console.error('Erro ao excluir churrasco:', error);
        }
    };

    const addPerson = async (data: any) => {
        try {
            const response = await postApi('peoples', data);
            console.log('Resposta do backend:', response.data);
            setChurrascoEditado(true);
        } catch (error) {
            console.error('Erro ao adicionar pessoa:', error);
        }
    };

    const editChurrasco = async (id: string, newData: any) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/peoples/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });
    
            if (!response.ok) {
                throw new Error('Erro ao editar churrasco');
            }
    
            console.log(`Churrasco com ID ${id} editado com sucesso`);
            setChurrascoEditado(true); 
        } catch (error) {
            console.error('Erro ao editar churrasco:', error);
        }
    };


    return (
        <ChurrasContext.Provider
            value={{
                churras,
                setChurras,
                infoChurras,
                addPerson,
                deleteChurrasco,
                editChurrasco,
                getChurrascoById,
                churrascoEditado
            }}
        >
            {children}
        </ChurrasContext.Provider>
    );
}

const useChurras = () => useContext(ChurrasContext);

export { ChurrasProvider, useChurras };
