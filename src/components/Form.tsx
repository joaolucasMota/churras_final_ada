import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from './Input';
import { useChurras } from '../context/churras.context';

interface ChurrascoData {
  homens: number;
  mulheres: number;
  criancas: number;
}

interface FormProps {
  churrascoData: ChurrascoData | null;
}

const schema = yup
  .object({
    homens: yup.number().positive('Valor inválido').integer().required('Campo obrigatório'),
    mulheres: yup.number().positive('Valor inválido').integer().required('Campo obrigatório'),
    criancas: yup.number().positive('Valor inválido').integer().required('Campo obrigatório'),
  })
  .required();

const Form: React.FC<FormProps> = ({ churrascoData }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ChurrascoData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: churrascoData,
  });


  // Obtenha a função de edição de churrasco do contexto
  const { editChurrasco } = useChurras();

  const onSubmit = async (data: ChurrascoData) => {
    try {
      // Chame a função para editar o churrasco com os dados do formulário
      await editChurrasco(churrascoData?.id, data);
      reset();
      // Talvez você queira redirecionar o usuário para outra página após a edição
    } catch (error) {
      console.error('Erro ao editar churrasco:', error);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-xl">
        <fieldset className="border border-solid border-blue-900 p-3">
          <legend className="text-sm font-bold">Editar Churrasco</legend>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mr-5">Salvar</button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
}

export default Form;
