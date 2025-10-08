export const Loading = ({ text = 'Chargement...', size = 'md' }) => {
    const sizes = {
      sm: 24,
      md: 40,
      lg: 56,
    };
    
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Loader2 className="animate-spin text-blue-500" size={sizes[size]} />
        <p className="text-gray-400 mt-4">{text}</p>
      </div>
    );
  };