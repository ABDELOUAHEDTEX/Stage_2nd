export const FilterPanel = ({ 
    filters, 
    onFilterChange, 
    onClearFilters,
    filterOptions,
    isCollapsed = false,
    onToggleCollapse 
  }) => {
    const [localFilters, setLocalFilters] = useState(filters);
    
    const handleChange = (key, value) => {
      const updated = { ...localFilters, [key]: value };
      setLocalFilters(updated);
      onFilterChange(updated);
    };
    
    const handleClear = () => {
      const cleared = {
        province: '',
        societe: '',
        etat: '',
        type_station: '',
      };
      setLocalFilters(cleared);
      onClearFilters();
    };
    
    const activeFiltersCount = Object.values(localFilters).filter(v => v).length;
    
    return (
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Filter className="text-blue-400" size={20} />
            <h3 className="text-lg font-bold text-white">Filtres</h3>
            {activeFiltersCount > 0 && (
              <span className="px-2 py-1 bg-blue-900 text-blue-300 text-xs font-bold rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClear}
                icon={RotateCcw}
              >
                Réinitialiser
              </Button>
            )}
            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="text-gray-400 hover:text-white transition"
              >
                <ChevronDown 
                  size={20} 
                  className={`transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
                />
              </button>
            )}
          </div>
        </div>
        
        {/* Filters Grid */}
        {!isCollapsed && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Select
                label="Province"
                value={localFilters.province}
                onChange={(value) => handleChange('province', value)}
                options={filterOptions.provinces || []}
                placeholder="Toutes les provinces"
              />
              
              <Select
                label="Société"
                value={localFilters.societe}
                onChange={(value) => handleChange('societe', value)}
                options={filterOptions.societes || []}
                placeholder="Toutes les sociétés"
              />
              
              <Select
                label="Type de Station"
                value={localFilters.type_station}
                onChange={(value) => handleChange('type_station', value)}
                options={filterOptions.types || []}
                placeholder="Tous les types"
              />
              
              <Select
                label="État"
                value={localFilters.etat}
                onChange={(value) => handleChange('etat', value)}
                options={filterOptions.etats || []}
                placeholder="Tous les états"
              />
            </div>
            
            {/* Active Filters Summary */}
            {activeFiltersCount > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-400 mb-2">Filtres actifs:</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(localFilters).map(([key, value]) => {
                    if (!value) return null;
                    
                    const labels = {
                      province: 'Province',
                      societe: 'Société',
                      type_station: 'Type',
                      etat: 'État',
                    };
                    
                    return (
                      <div
                        key={key}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/30 border border-blue-700 rounded-full text-sm text-blue-300"
                      >
                        <span className="font-medium">{labels[key]}:</span>
                        <span>{value}</span>
                        <button
                          onClick={() => handleChange(key, '')}
                          className="hover:text-white transition"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };