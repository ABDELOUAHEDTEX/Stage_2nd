export const Alert = ({ 
    type = 'info', 
    title, 
    message, 
    onClose,
    className = '' 
  }) => {
    const types = {
      success: {
        icon: CheckCircle,
        bgColor: 'bg-green-900/30',
        borderColor: 'border-green-700',
        iconColor: 'text-green-400',
        textColor: 'text-green-300',
      },
      error: {
        icon: AlertCircle,
        bgColor: 'bg-red-900/30',
        borderColor: 'border-red-700',
        iconColor: 'text-red-400',
        textColor: 'text-red-300',
      },
      warning: {
        icon: AlertCircle,
        bgColor: 'bg-yellow-900/30',
        borderColor: 'border-yellow-700',
        iconColor: 'text-yellow-400',
        textColor: 'text-yellow-300',
      },
      info: {
        icon: AlertCircle,
        bgColor: 'bg-blue-900/30',
        borderColor: 'border-blue-700',
        iconColor: 'text-blue-400',
        textColor: 'text-blue-300',
      },
    };
    
    const config = types[type];
    const Icon = config.icon;
    
    return (
      <div className={`${config.bgColor} border ${config.borderColor} rounded-lg p-4 ${className}`}>
        <div className="flex items-start gap-3">
          <Icon className={config.iconColor} size={20} />
          <div className="flex-1">
            {title && (
              <h4 className={`font-semibold ${config.textColor}`}>{title}</h4>
            )}
            {message && (
              <p className={`text-sm mt-1 ${config.textColor}`}>{message}</p>
            )}
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className={`${config.iconColor} hover:opacity-70 transition`}
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    );
  };