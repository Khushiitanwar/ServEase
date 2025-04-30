import React, { ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  cell?: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
}

function DataTable<T>({ data, columns, keyExtractor, emptyMessage = 'No data available' }: DataTableProps<T>) {
  const renderCell = (item: T, column: Column<T>) => {
    if (column.cell) {
      return column.cell(item);
    }
    
    if (typeof column.accessor === 'function') {
      return column.accessor(item);
    }
    
    return item[column.accessor] as ReactNode;
  };

  return (
    <div className="relative overflow-x-auto rounded-lg border border-dark-100">
      <table className="w-full">
        <thead className="bg-dark-100 text-gray-300 text-left text-sm">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-4 py-3 font-medium">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody className="divide-y divide-dark-100">
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={keyExtractor(item)} className="bg-dark-200 hover:bg-dark-100/50 transition-colors">
                {columns.map((column, index) => (
                  <td key={index} className="px-4 py-3 text-sm text-gray-200">
                    {renderCell(item, column)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-400">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;