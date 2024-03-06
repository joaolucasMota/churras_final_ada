import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form"
import * as yup from "yup"
import { Input } from "./Input";

interface Inputs {
    data: Date;
    homens: number;
    mulheres: number;
    criancas: number;
}

const schema = yup
    .object({
        data: yup.date().min(new Date(), 'Data inválida').required('Erro há data'),
        homens: yup.number().positive('Valor inválido').integer().required(),
        mulheres: yup.number().positive('Valor inválido').integer().required(),
        criancas: yup.number().positive('Valor inválido').integer().required(),
    })
    .required()

export default function Form() {

    const { register, watch, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema),
        mode: 'onChange'
    })

    const onSubmit = (data: Inputs) => {
        console.log(errors);
        console.log(data)
    }

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-xl">
                <fieldset className="border border-solid border-blue-900 p-3">
                    <legend className="text-sm font-bold">Novo Churrasco</legend>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label htmlFor="data" className="block">Data:</label>
                            <Input type="date" register={register} name="data" error={errors.data} className="bg-gray-200 p-2 rounded" />
                        </div>
                        <div>
                            <label htmlFor="homens" className="block">Homens:</label>
                            <Input type="text" register={register} name="homens" error={errors.homens} className="bg-gray-200 p-2 rounded" />
                        </div>
                        <div>
                            <label htmlFor="mulheres" className="block">Mulheres:</label>
                            <Input type="text" register={register} name="mulheres" error={errors.mulheres} className="bg-gray-200 p-2 rounded" />
                        </div>
                        <div>
                            <label htmlFor="criancas" className="block">Crianças:</label>
                            <Input type="text" register={register} name="criancas" error={errors.criancas} className="bg-gray-200 p-2 rounded" />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mr-5">Enviar</button>
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Excluir</button>
                        </div>
                    </form>
                </fieldset>
            </div>
        </div>
    )
}
