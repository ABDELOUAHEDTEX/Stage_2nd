export const AdvancedFilterModal = ({ 
    isOpen, 
    onClose, 
    filters,
    onApply,
    filterOptions 
  }) => {
    const [localFilters, setLocalFilters] = useState(filters);
    
    const handleApply = () => {
      onApply(localFilters);
      onClose();
    };
    
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <div className="relative bg-gray-800 rounded-lg shadow-2xl border border-gray-700 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between sticky top-0 bg-gray-800 z-10">
            <h2 className="text-xl font-bold text-white">Filtres Avancés</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Province / Préfecture"
                value={localFilters.province}
                onChange={(value) => setLocalFilters({...localFilters, province: value})}
                options={filterOptions.provinces || []}
                placeholder="Toutes"
              />
              
              <Select
                label="Société"
                value={localFilters.societe}
                onChange={(value) => setLocalFilters({...localFilters, societe: value})}
                options={filterOptions.societes || []}
                placeholder="Toutes"
              />
              
              <Select
                label="Type de Station"
                value={localFilters.type_station}
                onChange={(value) => setLocalFilters({...localFilters, type_station: value})}
                options={filterOptions.types || []}
                placeholder="Tous"
              />
              
              <Select
                label="État"
                value={localFilters.etat}
                onChange={(value) => setLocalFilters({...localFilters, etat: value})}
                options={filterOptions.etats || []}
                placeholder="Tous"
              />
            </div>
            
            <div className="pt-4 border-t border-gray-700">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">Options Additionnelles</h3>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localFilters.urbain || false}
                    onChange={(e) => setLocalFilters({...localFilters, urbain: e.target.checked})}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                  />
                  <span className="text-gray-300">Stations urbaines uniquement</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localFilters.hasCoordinates || false}
                    onChange={(e) => setLocalFilters({...localFilters, hasCoordinates: e.target.checked})}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                  />
                  <span className="text-gray-300">Avec coordonnées GPS uniquement</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-700 flex items-center justify-end gap-3 sticky bottom-0 bg-gray-800">
            <Button
              variant="outline"
              onClick={() => setLocalFilters({})}
            >
              Réinitialiser
            </Button>
            <Button
              variant="secondary"
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button
              variant="primary"
              onClick={handleApply}
            >
              Appliquer
            </Button>
          </div>
        </div>
      </div>
    );
  };