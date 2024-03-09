import { createContext, useContext, useEffect, useState } from "react";
import { getApi } from "../services/axios";
import Churrasco from "../utils/class";

interface IChurrasContext {
    churras: object;
    setChurras: (churras: object) => void;
}

const LOADING_CONTEXT_DEFAULT_VALUE: IChurrasContext = {
    churras: {},
    setChurras: () => null,
}

const LoadingContext = createContext<IChurrasContext>(LOADING_CONTEXT_DEFAULT_VALUE);

interface IChurrasProvider {
    children: React.ReactNode;
}

const ChurrasProvider = ({ children }: IChurrasProvider) => {

    const [churras, setChurras] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                let resp = await getApi<IPeople>('peoples');
                setChurras(resp.data);
            } catch (error) {
                console.error(error)
            } finally {
                // Possível loading
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
        const resultados = [];

        for (const obj of objetos) {
            const churrascoDoFimDeSemana = new Churrasco(obj.homens, obj.mulheres, obj.criancas);
            const totalCarne = churrascoDoFimDeSemana.calcularTodos();
            resultados.push({ id: obj.id, totalCarne: totalCarne });
        }

        console.log(resultados);
        return resultados;
    };

    return (
        <LoadingContext.Provider
            value={{
                churras,
                setChurras
            }}
        >
            {children}
        </LoadingContext.Provider>
    );
}

const useLoading = () => useContext(LoadingContext);

export { ChurrasProvider, useLoading };
