import React, { useEffect, useState } from 'react';
import { useChurras } from '../context/churras.context';
import Form from './Form';
import { getApi } from '../services/axios';


interface TableProps {}

const Table: React.FC<TableProps> = () => {

  const { infoChurras, deleteChurrasco, churrascoEditado } = useChurras();
  const [editingChurrascoId, setEditingChurrascoId] = useState<any | null>(null);

  useEffect(() => {
    console.log('infoChurras mudou:', infoChurras);
  }, [infoChurras, churrascoEditado]);


  const onDelete = async (id: string) => {
    try {
      await deleteChurrasco(id); 
      console.log(id);
    } catch (error) {
      console.error('Erro ao excluir churrasco:', error);
    }
  };

  const onEdit = (id: string) => {
    setEditingChurrascoId(id);
  };

  return (
    <div>
       {editingChurrascoId ? (
        <Form churrascoId={editingChurrascoId} onCancel={() => setEditingChurrascoId(null)} />
      ) : (
        <div className="mt-8 ml-20 mr-20 mx-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
        {infoChurras.length > 0 ? (
          <>
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade de Pessoas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carne</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pão de Alho</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carvão</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Refri</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cerveja</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ação</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {infoChurras.map((row) => (
                <tr key={row.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{row.data}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.totalPessoas}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.totalCarne.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.totalPaoDeAlho}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.totalCarvao}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.totalRefrigerante}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.totalCerveja}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => onEdit(row.id || '')} className="bg-blue-500 text-white py-1 px-3 rounded mr-2">Editar</button>
                    <button onClick={() => onDelete(row.id || '')} className="bg-red-500 text-white py-1 px-3 rounded">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        ) : (
          <tbody>
            <tr>
              <td colSpan={8} className="px-6 py-4 whitespace-nowrap text-center text-gray-500">Nenhum dado disponível</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
      )}
    </div>
    
  );
};

export default Table;
