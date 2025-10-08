export const ProvinceStats = ({ provinceData, limit = 5 }) => {
    const sortedProvinces = Object.entries(provinceData || {})
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit);
    
    const total = Object.values(provinceData || {}).reduce((sum, val) => sum + val, 0);
    
    return (
      <div className="space-y-4">
        {sortedProvinces.map(([province, count]) => {
          const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
          
          return (
            <div key={province} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300 font-medium">{province}</span>
                <span className="text-gray-400">{count} stations</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-blue-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 text-right">
                {percentage}%
              </div>
            </div>
          );
        })}
      </div>
    );
  };