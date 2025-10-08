export const EmptyState = ({ 
    icon: Icon, 
    title, 
    description, 
    action 
  }) => {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        {Icon && <Icon className="text-gray-600" size={64} />}
        <h3 className="mt-4 text-xl font-semibold text-gray-300">{title}</h3>
        {description && (
          <p className="mt-2 text-gray-500 max-w-md">{description}</p>
        )}
        {action && <div className="mt-6">{action}</div>}
      </div>
    );
  };