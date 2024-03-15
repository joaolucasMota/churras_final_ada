import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from './Input';
import { useChurras } from '../context/churras.context';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

interface ChurrascoData {
  id?: string;
  homens: number;
  mulheres: number;
  criancas: number;
}

const schema = yup.object({
  homens: yup.number().integer('Valor inválido').typeError('Digite um número').required('Campo obrigatório'),
  mulheres: yup.number().integer('Valor inválido').typeError('Digite um número').required('Campo obrigatório'),
  criancas: yup.number().integer('Valor inválido').typeError('Digite um número').required('Campo obrigatório'),
}).required();

const Form = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ChurrascoData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { id } = useParams<{ id: string }>();
  const { getChurrascoById, addPerson, editChurrasco } = useChurras();
  const [churrascoData, setChurrascoData] = useState<ChurrascoData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const churrasco = await getChurrascoById(id);
          setChurrascoData(churrasco);
        } catch (error) {
          console.error('Erro ao obter churrasco:', error);
        }
      }
    };

    fetchData();
  }, [id, getChurrascoById]);

  const onSubmit = async (data: ChurrascoData) => {
    try {
      if (id) {
        await editChurrasco(id, data);
      } else {
        const newId = uuidv4();
        await addPerson({ ...data, id: newId });
      }
      navigate('/');
    } catch (error) {
      console.error('Erro ao editar/adicionar churrasco:', error);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-xl">
        <fieldset className="border border-solid border-blue-900 p-3">
          <legend className="text-sm font-bold">{id ? 'Editar Churrasco' : 'Criar Churrasco'}</legend>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="homens" className="block">Homens:</label>
              <Input type="text" register={register} name="homens" defaultValue={churrascoData?.homens || ''} error={errors.homens} className="bg-gray-200 p-2 rounded" />
            </div>
            <div>
              <label htmlFor="mulheres" className="block">Mulheres:</label>
              <Input type="text" register={register} name="mulheres" defaultValue={churrascoData?.mulheres || ''} error={errors.mulheres} className="bg-gray-200 p-2 rounded" />
            </div>
            <div>
              <label htmlFor="criancas" className="block">Crianças:</label>
              <Input type="text" register={register} name="criancas" defaultValue={churrascoData?.criancas || ''} error={errors.criancas} className="bg-gray-200 p-2 rounded" />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mr-5">Salvar</button>
              <Link to="/" className="bg-gray-300 text-gray-700 py-2 px-4 rounded">Cancelar</Link>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
}

export default Form;
