export const KPICard = ({ 
    title, 
    value, 
    subtitle,
    icon: Icon,
    trend,
    trendValue,
    color = 'blue',
    loading = false 
  }) => {
    const colors = {
      blue: 'text-blue-400 bg-blue-900/20',
      green: 'text-green-400 bg-green-900/20',
      red: 'text-red-400 bg-red-900/20',
      yellow: 'text-yellow-400 bg-yellow-900/20',
      purple: 'text-purple-400 bg-purple-900/20',
    };
    
    const trendColors = {
      up: 'text-green-400',
      down: 'text-red-400',
      neutral: 'text-gray-400',
    };
    
    const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : null;
    
    if (loading) {
      return (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-1/3"></div>
        </div>
      );
    }
    
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">
              {title}
            </p>
            <p className="text-3xl font-bold text-white mt-2">
              {value}
            </p>
            
            {subtitle && (
              <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
            )}
            
            {trend && trendValue && (
              <div className={`flex items-center gap-1 mt-2 text-sm ${trendColors[trend]}`}>
                {TrendIcon && <TrendIcon size={16} />}
                <span className="font-medium">{trendValue}</span>
              </div>
            )}
          </div>
          
          {Icon && (
            <div className={`p-3 rounded-lg ${colors[color]}`}>
              <Icon size={28} />
            </div>
          )}
        </div>
      </div>
    );
  };