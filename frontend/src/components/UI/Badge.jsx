export const Badge = ({ 
    children, 
    variant = 'default',
    size = 'md',
    className = '' 
  }) => {
    const variants = {
      default: 'bg-gray-700 text-gray-300',
      primary: 'bg-blue-900 text-blue-300',
      success: 'bg-green-900 text-green-300',
      warning: 'bg-yellow-900 text-yellow-300',
      danger: 'bg-red-900 text-red-300',
    };
    
    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    };
    
    return (
      <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`}>
        {children}
      </span>
    );
  };