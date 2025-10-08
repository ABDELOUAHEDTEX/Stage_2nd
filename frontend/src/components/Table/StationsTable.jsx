import React from 'react';
import { MapPin, ExternalLink, Star } from 'lucide-react';
import { DataTable } from './DataTable';
import { Badge } from '../UI';

// ============================================
// Stations Table Component (Specialized)
// ============================================

export const StationsTable = ({ 
  stations = [],
  loading = false,
  onStationClick,
  favorites = [],
  onToggleFavorite
}) => {
  const columns = [
    {
      key: 'favorite',
      label: '',
      render: (_, station) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(station.id);
          }}
          className="text-gray-500 hover:text-yellow-400 transition"
        >
          <Star 
            size={18} 
            fill={favorites.includes(station.id) ? '#FBBF24' : 'none'}
            className={favorites.includes(station.id) ? 'text-yellow-400' : ''}
          />
        </button>
      )
    },
    {
      key: 'societe',
      label: 'Société',
      render: (value) => (
        <span className="font-medium text-white">{value || '-'}</span>
      )
    },
    {
      key: 'type_station',
      label: 'Type',
      render: (value) => value || '-'
    },
    {
      key: 'province_prefecture',
      label: 'Province',
      render: (value) => (
        <span className="text-gray-300">{value || '-'}</span>
      )
    },
    {
      key: 'adresse',
      label: 'Adresse',
      render: (value) => (
        <span className="text-sm text-gray-400 truncate max-w-xs block">
          {value || '-'}
        </span>
      )
    },
    {
      key: 'etat_station',
      label: 'État',
      render: (value) => (
        <Badge 
          variant={value === 'en activité' ? 'success' : 'danger'}
          size="sm"
        >
          {value}
        </Badge>
      )
    },
    {
      key: 'coordinates',
      label: 'GPS',
      render: (_, station) => {
        if (!station.latitude || !station.longitude) {
          return <span className="text-gray-600">-</span>;
        }
        
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(
                `https://www.google.com/maps?q=${station.latitude},${station.longitude}`,
                '_blank'
              );
            }}
            className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition"
          >
            <MapPin size={16} />
            <ExternalLink size={12} />
          </button>
        );
      }
    }
  ];
  
  return (
    <DataTable
      data={stations}
      columns={columns}
      loading={loading}
      onRowClick={onStationClick}
      sortable={true}
      pagination={true}
      itemsPerPage={15}
    />
  );
};

// ============================================
// Compact Stations List (Alternative View)
// ============================================

export const CompactStationsList = ({ stations = [], onStationClick }) => {
  if (stations.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucune station trouvée
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      {stations.map((station) => (
        <div
          key={station.id}
          onClick={() => onStationClick?.(station)}
          className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 hover:shadow-lg transition cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-white">
                {station.societe || 'Station sans nom'}
              </h4>
              <p className="text-sm text-gray-400 mt-1">
                {station.adresse || 'Adresse non disponible'}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-gray-500">
                  {station.province_prefecture}
                </span>
                <span className="text-xs text-gray-600">•</span>
                <span className="text-xs text-gray-500">
                  {station.type_station}
                </span>
              </div>
            </div>
            
            <Badge
              variant={station.etat_station === 'en activité' ? 'success' : 'danger'}
              size="sm"
            >
              {station.etat_station}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================
// Station Detail Card
// ============================================

export const StationDetailCard = ({ station }) => {
  if (!station) return null;
  
  const details = [
    { label: 'Société', value: station.societe },
    { label: 'Type', value: station.type_station },
    { label: 'Province', value: station.province_prefecture },
    { label: 'Adresse', value: station.adresse },
    { label: 'Gérant', value: station.gerant },
    { label: 'Type de Gérance', value: station.type_gerance },
    { label: 'Capacité', value: station.capacite ? `${station.capacite} L` : null },
    { label: 'Date Création', value: station.date_creation },
    { label: 'Localisation', value: station.urbain ? 'Urbaine' : 'Rurale' },
  ];
  
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {station.societe || 'Station'}
            </h2>
            <p className="text-blue-200 mt-1">{station.type_station}</p>
          </div>
          <Badge
            variant={station.etat_station === 'en activité' ? 'success' : 'danger'}
          >
            {station.etat_station}
          </Badge>
        </div>
      </div>
      
      {/* Details */}
      <div className="p-6 space-y-4">
        {details.map((detail, index) => {
          if (!detail.value) return null;
          
          return (
            <div key={index} className="flex items-start justify-between border-b border-gray-700 pb-3">
              <span className="text-gray-400 font-medium">{detail.label}</span>
              <span className="text-white text-right">{detail.value}</span>
            </div>
          );
        })}
        
        {/* Coordinates */}
        {station.latitude && station.longitude && (
          <div className="pt-4">
            <a
              href={`https://www.google.com/maps?q=${station.latitude},${station.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
              <MapPin size={20} />
              Voir sur la carte
              <ExternalLink size={16} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
