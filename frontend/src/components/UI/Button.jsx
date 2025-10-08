export const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    disabled = false,
    onClick,
    className = '',
    icon: Icon,
    ...props 
  }) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900';
    
    const variants = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 disabled:bg-blue-800 disabled:opacity-50',
      secondary: 'bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500 disabled:opacity-50',
      success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 disabled:opacity-50',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 disabled:opacity-50',
      outline: 'border-2 border-gray-600 hover:bg-gray-800 text-gray-300 focus:ring-gray-500 disabled:opacity-50',
    };
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };
    
    return (
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {loading ? (
          <Loader2 className="animate-spin" size={18} />
        ) : Icon ? (
          <Icon size={18} />
        ) : null}
        {children}
      </button>
    );
  };