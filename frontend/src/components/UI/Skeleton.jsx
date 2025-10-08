export const Skeleton = ({ className = '', variant = 'text' }) => {
    const variants = {
      text: 'h-4 w-full',
      title: 'h-8 w-3/4',
      circular: 'h-12 w-12 rounded-full',
      rectangular: 'h-32 w-full',
    };
    
    return (
      <div className={`bg-gray-700 animate-pulse rounded ${variants[variant]} ${className}`} />
    );
  };