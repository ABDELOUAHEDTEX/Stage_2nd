export const QuickStatsSummary = ({ analytics }) => {
    if (!analytics) return null;
    
    const stats = [
      { 
        label: 'Provinces', 
        value: Object.keys(analytics.by_province || {}).length,
        color: 'text-blue-400'
      },
      { 
        label: 'Sociétés', 
        value: Object.keys(analytics.by_societe || {}).length,
        color: 'text-green-400'
      },
      { 
        label: 'Types', 
        value: Object.keys(analytics.by_type || {}).length,
        color: 'text-yellow-400'
      },
    ];
    
    return (
      <div className="flex items-center justify-around py-4 bg-gray-800 rounded-lg border border-gray-700">
        {stats.map((stat, index) => (
          <React.Fragment key={stat.label}>
            {index > 0 && <div className="h-12 w-px bg-gray-700" />}
            <div className="text-center">
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  };