export const CompanyStats = ({ companyData, limit = 6 }) => {
    const sortedCompanies = Object.entries(companyData || {})
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit);
    
    const total = Object.values(companyData || {}).reduce((sum, val) => sum + val, 0);
    
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
    ];
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {sortedCompanies.map(([company, count], index) => {
          const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
          
          return (
            <div 
              key={company}
              className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-all"
            >
              <div className={`w-12 h-12 rounded-lg ${colors[index % colors.length]} flex items-center justify-center mb-3`}>
                <Building2 className="text-white" size={24} />
              </div>
              <p className="text-2xl font-bold text-white">{count}</p>
              <p className="text-xs text-gray-400 mt-1 truncate" title={company}>
                {company}
              </p>
              <div className="mt-2 text-xs text-gray-500">
                {percentage}% du total
              </div>
            </div>
          );
        })}
      </div>
    );
  };