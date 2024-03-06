import React from 'react';

interface TableProps {
  data: {
    id: number;
    date: string;
    people: number;
    meat: string;
    garlicBread: string;
    charcoal: string;
    soda: string;
    beer: string;
  }[];
//   onEdit: (id: number) => void;
//   onDelete: (id: number) => void;
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
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
          {data.map((row) => (
            <tr key={row.id}>
              <td className="px-6 py-4 whitespace-nowrap">{row.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.people}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.meat}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.garlicBread}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.charcoal}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.soda}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.beer}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {/* <button onClick={() => onEdit(row.id)} className="bg-blue-500 text-white py-1 px-3 rounded mr-2">Editar</button>
                <button onClick={() => onDelete(row.id)} className="bg-red-500 text-white py-1 px-3 rounded">Excluir</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
