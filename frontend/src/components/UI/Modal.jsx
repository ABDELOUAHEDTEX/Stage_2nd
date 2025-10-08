export const Modal = ({ 
    isOpen, 
    onClose, 
    title, 
    children,
    size = 'md',
    footer 
  }) => {
    if (!isOpen) return null;
    
    const sizes = {
      sm: 'max-w-md',
      md: 'max-w-2xl',
      lg: 'max-w-4xl',
      xl: 'max-w-6xl',
    };
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className={`relative bg-gray-800 rounded-lg shadow-2xl border border-gray-700 ${sizes[size]} w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col`}>
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Body */}
          <div className="px-6 py-4 overflow-y-auto flex-1">
            {children}
          </div>
          
          {/* Footer */}
          {footer && (
            <div className="px-6 py-4 border-t border-gray-700 flex items-center justify-end gap-3">
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  };