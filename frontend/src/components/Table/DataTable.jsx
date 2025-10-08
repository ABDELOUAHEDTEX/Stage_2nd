import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { Pagination } from '../UI';

// ============================================
// Data Table Component (Generic)
// ============================================

export const DataTable = ({ 
  data = [], 
  columns = [],
  loading = false,
  onRowClick,
  sortable = true,
  pagination = true,
  itemsPerPage = 10
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  
  // Tri
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      
      if (aVal === bVal) return 0;
      
      const comparison = aVal < bVal ? -1 : 1;
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortConfig]);
  
  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = pagination 
    ? sortedData.slice(startIndex, startIndex + itemsPerPage)
    : sortedData;
  
  const handleSort = (key) => {
    if (!sortable) return;
    
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };
  
  const SortIcon = ({ columnKey }) => {
    if (!sortable) return null;
    
    if (sortConfig.key !== columnKey) {
      return <ChevronsUpDown size={16} className="text-gray-500" />;
    }
    
    return sortConfig.direction === 'asc' 
      ? <ChevronUp size={16} className="text-blue-400" />
      : <ChevronDown size={16} className="text-blue-400" />;
  };
  
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-700 animate-pulse rounded" />
        ))}
      </div>
    );
  }
  
  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">Aucune donnée disponible</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  className={`text-left py-3 px-4 text-gray-400 font-medium ${
                    sortable ? 'cursor-pointer hover:text-white transition' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    <SortIcon columnKey={column.key} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={row.id || index}
                onClick={() => onRowClick?.(row)}
                className={`border-b border-gray-700 ${
                  onRowClick ? 'cursor-pointer hover:bg-gray-750 transition' : ''
                }`}
              >
                {columns.map((column) => (
                  <td key={column.key} className="py-3 px-4">
                    {column.render 
                      ? column.render(row[column.key], row)
                      : row[column.key] || '-'
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            Affichage {startIndex + 1} à {Math.min(startIndex + itemsPerPage, sortedData.length)} sur {sortedData.length} résultats
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};
