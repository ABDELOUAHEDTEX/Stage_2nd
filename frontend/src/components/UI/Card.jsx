export const Card = ({ 
    children, 
    title, 
    subtitle, 
    headerAction,
    className = '',
    padding = true 
  }) => {
    return (
      <div className={`bg-gray-800 rounded-lg border border-gray-700 overflow-hidden ${className}`}>
        {(title || subtitle || headerAction) && (
          <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
            <div>
              {title && <h3 className="text-lg font-bold text-white">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
            </div>
            {headerAction && <div>{headerAction}</div>}
          </div>
        )}
        <div className={padding ? 'p-6' : ''}>
          {children}
        </div>
      </div>
    );
  };