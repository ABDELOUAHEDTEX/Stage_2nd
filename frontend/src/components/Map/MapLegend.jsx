import React from 'react';
import { MapPin, Activity, AlertCircle, Building2, Zap } from 'lucide-react';

// ============================================
// Map Legend Component
// ============================================

export const MapLegend = ({ 
  stats = { total: 0, active: 0, inactive: 0 },
  showStats = true,
  showMarkers = true,
  className = '' 
}) => {
  const legendItems = [
    {
      icon: <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white" />,
      label: 'En activité',
      count: stats.active,
      color: 'text-green-400'
    },
    {
      icon: <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white" />,
      label: 'En arrêt',
      count: stats.inactive,
      color: 'text-red-400'
    }
  ];

  const markerTypes = [
    {
      icon: <Building2 size={16} className="text-blue-400" />,
      label: 'Station-service',
      description: 'Station de carburant'
    },
    {
      icon: <Zap size={16} className="text-yellow-400" />,
      label: 'Station électrique',
      description: 'Borne de recharge'
    }
  ];

  return (
    <div className={`bg-gray-900/95 backdrop-blur-sm rounded-lg p-4 border border-gray-700 shadow-lg ${className}`}>
      <h4 className="text-white font-bold mb-3 text-sm flex items-center gap-2">
        <MapPin size={16} className="text-blue-400" />
        Légende
      </h4>
      
      {/* Statistiques */}
      {showStats && (
        <div className="mb-4 pb-4 border-b border-gray-700">
          <h5 className="text-gray-300 font-medium mb-2 text-xs uppercase tracking-wide">
            Statistiques
          </h5>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Total:</span>
              <span className="text-white font-bold">{stats.total}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Actives:</span>
              <span className="text-green-400 font-bold">{stats.active}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">En arrêt:</span>
              <span className="text-red-400 font-bold">{stats.inactive}</span>
            </div>
          </div>
        </div>
      )}

      {/* Marqueurs de statut */}
      <div className="mb-4">
        <h5 className="text-gray-300 font-medium mb-2 text-xs uppercase tracking-wide">
          Statut
        </h5>
        <div className="space-y-2">
          {legendItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {item.icon}
              <span className="text-gray-300 text-sm">{item.label}</span>
              {item.count !== undefined && (
                <span className={`text-xs font-bold ml-auto ${item.color}`}>
                  ({item.count})
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Types de marqueurs */}
      {showMarkers && (
        <div>
          <h5 className="text-gray-300 font-medium mb-2 text-xs uppercase tracking-wide">
            Types
          </h5>
          <div className="space-y-2">
            {markerTypes.map((type, index) => (
              <div key={index} className="flex items-center gap-2">
                {type.icon}
                <div>
                  <div className="text-gray-300 text-sm">{type.label}</div>
                  <div className="text-gray-500 text-xs">{type.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// Compact Legend (for smaller spaces)
// ============================================

export const CompactLegend = ({ 
  stats = { active: 0, inactive: 0 },
  className = '' 
}) => {
  return (
    <div className={`bg-gray-900/95 backdrop-blur-sm rounded-lg p-3 border border-gray-700 shadow-lg ${className}`}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-gray-300 text-sm">{stats.active}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-gray-300 text-sm">{stats.inactive}</span>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Legend with Filters
// ============================================

export const FilterableLegend = ({ 
  stats,
  filters = {},
  onFilterChange,
  className = '' 
}) => {
  const filterOptions = [
    { key: 'active', label: 'Actives', color: 'green', count: stats.active },
    { key: 'inactive', label: 'En arrêt', color: 'red', count: stats.inactive }
  ];

  return (
    <div className={`bg-gray-900/95 backdrop-blur-sm rounded-lg p-4 border border-gray-700 shadow-lg ${className}`}>
      <h4 className="text-white font-bold mb-3 text-sm">Filtres</h4>
      
      <div className="space-y-2">
        {filterOptions.map((option) => (
          <label key={option.key} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters[option.key] || false}
              onChange={(e) => onFilterChange?.(option.key, e.target.checked)}
              className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
            />
            <div className={`w-3 h-3 rounded-full bg-${option.color}-500`} />
            <span className="text-gray-300 text-sm">{option.label}</span>
            <span className={`text-xs font-bold ml-auto text-${option.color}-400`}>
              ({option.count})
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MapLegend;
