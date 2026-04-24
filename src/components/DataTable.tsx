"use client";

export function DataTable({ data, field, onEdit }: any) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left font-medium">Nome</th>
            <th className="p-2 text-center w-24">Ações</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item: any) => (
            <tr key={item.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{item[field]}</td>

              <td className="p-2 text-center">
                <button
                  onClick={() => onEdit(item)}
                  className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
