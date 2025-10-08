import React from 'react';
import { Layers, Maximize2, Minimize2, Filter, Search, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

// ============================================
// Map Controls Component
// ============================================

export const MapControls = ({ 
  onLayerChange,
  onToggleFullscreen,
  onFilter,
  onSearch,
  onZoomIn,
  onZoomOut,
  onResetView,
  isFullscreen = false,
  activeLayer = 'streets',
  showFilters = true,
  showSearch = true
}) => {
  const controls = [
    {
      id: 'layers',
      icon: Layers,
      onClick: () => onLayerChange?.(activeLayer === 'streets' ? 'satellite' : 'streets'),
      title: 'Changer de vue',
      active: false
    },
    {
      id: 'fullscreen',
      icon: isFullscreen ? Minimize2 : Maximize2,
      onClick: onToggleFullscreen,
      title: isFullscreen ? 'Quitter le plein écran' : 'Plein écran',
      active: false
    },
    {
      id: 'zoom-in',
      icon: ZoomIn,
      onClick: onZoomIn,
      title: 'Zoom avant',
      active: false
    },
    {
      id: 'zoom-out',
      icon: ZoomOut,
      onClick: onZoomOut,
      title: 'Zoom arrière',
      active: false
    },
    {
      id: 'reset',
      icon: RotateCcw,
      onClick: onResetView,
      title: 'Réinitialiser la vue',
      active: false
    }
  ];

  const additionalControls = [];
  
  if (showFilters) {
    additionalControls.push({
      id: 'filter',
      icon: Filter,
      onClick: onFilter,
      title: 'Filtres',
      active: false
    });
  }
  
  if (showSearch) {
    additionalControls.push({
      id: 'search',
      icon: Search,
      onClick: onSearch,
      title: 'Rechercher',
      active: false
    });
  }

  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
      {/* Contrôles principaux */}
      {controls.map((control) => (
        <button
          key={control.id}
          onClick={control.onClick}
          className={`bg-gray-900/95 backdrop-blur-sm hover:bg-gray-800 text-white p-3 rounded-lg border border-gray-700 shadow-lg transition ${
            control.active ? 'bg-blue-600 border-blue-500' : ''
          }`}
          title={control.title}
        >
          <control.icon size={20} />
        </button>
      ))}
      
      {/* Contrôles additionnels */}
      {additionalControls.length > 0 && (
        <>
          <div className="h-px bg-gray-600 my-1" />
          {additionalControls.map((control) => (
            <button
              key={control.id}
              onClick={control.onClick}
              className={`bg-gray-900/95 backdrop-blur-sm hover:bg-gray-800 text-white p-3 rounded-lg border border-gray-700 shadow-lg transition ${
                control.active ? 'bg-blue-600 border-blue-500' : ''
              }`}
              title={control.title}
            >
              <control.icon size={20} />
            </button>
          ))}
        </>
      )}
    </div>
  );
};

// ============================================
// Map Layer Selector
// ============================================

export const MapLayerSelector = ({ 
  activeLayer, 
  onLayerChange,
  className = '' 
}) => {
  const layers = [
    { id: 'streets', name: 'Rues', description: 'Vue des rues' },
    { id: 'satellite', name: 'Satellite', description: 'Vue satellite' },
    { id: 'terrain', name: 'Terrain', description: 'Vue du terrain' }
  ];

  return (
    <div className={`bg-gray-900/95 backdrop-blur-sm rounded-lg p-4 border border-gray-700 shadow-lg ${className}`}>
      <h4 className="text-white font-bold mb-3 text-sm">Couches de carte</h4>
      <div className="space-y-2">
        {layers.map((layer) => (
          <button
            key={layer.id}
            onClick={() => onLayerChange?.(layer.id)}
            className={`w-full text-left p-2 rounded-lg transition ${
              activeLayer === layer.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <div className="font-medium text-sm">{layer.name}</div>
            <div className="text-xs opacity-75">{layer.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================
// Map Search Bar
// ============================================

export const MapSearchBar = ({ 
  value, 
  onChange, 
  onSearch,
  placeholder = "Rechercher une station...",
  className = '' 
}) => {
  return (
    <div className={`bg-gray-900/95 backdrop-blur-sm rounded-lg p-4 border border-gray-700 shadow-lg ${className}`}>
      <h4 className="text-white font-bold mb-3 text-sm">Recherche</h4>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onKeyPress={(e) => e.key === 'Enter' && onSearch?.(value)}
        />
        <button
          onClick={() => onSearch?.(value)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
        >
          <Search size={18} />
        </button>
      </div>
    </div>
  );
};

export default MapControls;
