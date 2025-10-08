/**
 * Station Map Component - Leaflet Integration
 * Installation requise: npm install leaflet react-leaflet
 */

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Layers, Maximize2, Minimize2, Filter } from 'lucide-react';

// Fix pour les icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// ============================================
// Station Map Component
// ============================================

export const StationMap = ({ 
  stations = [],
  center = [32.3373, -6.3498], // Béni Mellal-Khénifra
  zoom = 8,
  onStationClick,
  filters = {},
  height = '600px'
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeLayer, setActiveLayer] = useState('streets');
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });

  // Icônes personnalisées
  const createCustomIcon = (color) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          width: 24px;
          height: 24px;
          background-color: ${color};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12]
    });
  };

  const activeIcon = createCustomIcon('#10b981');
  const inactiveIcon = createCustomIcon('#ef4444');

  // Initialiser la carte
  useEffect(() => {
    if (!mapRef.current) return;

    // Créer la carte
    const map = L.map(mapRef.current).setView(center, zoom);
    mapInstanceRef.current = map;

    // Ajouter la couche de tuiles par défaut
    const streetsLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    });
    
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri',
      maxZoom: 18,
    });

    streetsLayer.addTo(map);

    // Gestion des couches
    const baseMaps = {
      'streets': streetsLayer,
      'satellite': satelliteLayer
    };

    // Cleanup
    return () => {
      map.remove();
    };
  }, []);

  // Mettre à jour les marqueurs
  useEffect(() => {
    if (!mapInstanceRef.current || !stations.length) return;

    const map = mapInstanceRef.current;

    // Supprimer les anciens marqueurs
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Statistiques
    let activeCount = 0;
    let inactiveCount = 0;

    // Ajouter les nouveaux marqueurs
    stations.forEach(station => {
      if (!station.latitude || !station.longitude) return;

      const isActive = station.etat === 'en activité';
      if (isActive) activeCount++;
      else inactiveCount++;

      const marker = L.marker([station.latitude, station.longitude], {
        icon: isActive ? activeIcon : inactiveIcon
      });

      const popupContent = `
        <div style="font-family: system-ui; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; color: #1e40af; font-size: 16px; font-weight: bold;">
            ${station.societe || 'Station'}
          </h3>
          <div style="font-size: 13px; color: #666; line-height: 1.6;">
            <p style="margin: 4px 0;"><strong>Type:</strong> ${station.type || 'N/A'}</p>
            <p style="margin: 4px 0;"><strong>Province:</strong> ${station.province || 'N/A'}</p>
            <p style="margin: 4px 0;"><strong>Adresse:</strong> ${station.adresse || 'N/A'}</p>
            <p style="margin: 8px 0 4px 0;">
              <span style="
                display: inline-block;
                padding: 4px 12px;
                border-radius: 12px;
                font-size: 11px;
                font-weight: bold;
                background-color: ${isActive ? '#d1fae5' : '#fee2e2'};
                color: ${isActive ? '#065f46' : '#991b1b'};
              ">
                ${station.etat}
              </span>
            </p>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      
      if (onStationClick) {
        marker.on('click', () => onStationClick(station));
      }

      marker.addTo(map);
      markersRef.current.push(marker);
    });

    // Mettre à jour les stats
    setStats({
      total: stations.length,
      active: activeCount,
      inactive: inactiveCount
    });

    // Ajuster la vue pour afficher tous les marqueurs
    if (markersRef.current.length > 0) {
      const group = L.featureGroup(markersRef.current);
      map.fitBounds(group.getBounds().pad(0.1));
    }

  }, [stations]);

  // Gestion du plein écran
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 100);
  };

  // Changer de couche
  const changeLayer = (layer) => {
    if (!mapInstanceRef.current) return;
    
    const map = mapInstanceRef.current;
    
    // Retirer toutes les couches
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });
    
    // Ajouter la nouvelle couche
    if (layer === 'streets') {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);
    } else {
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 18,
      }).addTo(map);
    }
    
    setActiveLayer(layer);
  };

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Carte */}
      <div 
        ref={mapRef} 
        style={{ height: isFullscreen ? '100vh' : height }}
        className="rounded-lg overflow-hidden border border-gray-700"
      />

      {/* Panneau de statistiques */}
      <div className="absolute top-4 left-4 bg-gray-900/95 backdrop-blur-sm rounded-lg p-4 border border-gray-700 shadow-lg z-[1000]">
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <MapPin size={18} className="text-blue-400" />
          Statistiques
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-400">Total:</span>
            <span className="text-white font-bold">{stats.total}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-400">Actives:</span>
            <span className="text-green-400 font-bold">{stats.active}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-400">En arrêt:</span>
            <span className="text-red-400 font-bold">{stats.inactive}</span>
          </div>
        </div>
      </div>

      {/* Légende */}
      <div className="absolute bottom-4 right-4 bg-gray-900/95 backdrop-blur-sm rounded-lg p-4 border border-gray-700 shadow-lg z-[1000]">
        <h4 className="text-white font-bold mb-3 text-sm">Légende</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            <span className="text-gray-300 text-sm">En activité</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
            <span className="text-gray-300 text-sm">En arrêt</span>
          </div>
        </div>
      </div>

      {/* Contrôles */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
        {/* Changer de couche */}
        <button
          onClick={() => changeLayer(activeLayer === 'streets' ? 'satellite' : 'streets')}
          className="bg-gray-900/95 backdrop-blur-sm hover:bg-gray-800 text-white p-3 rounded-lg border border-gray-700 shadow-lg transition"
          title="Changer de vue"
        >
          <Layers size={20} />
        </button>

        {/* Plein écran */}
        <button
          onClick={toggleFullscreen}
          className="bg-gray-900/95 backdrop-blur-sm hover:bg-gray-800 text-white p-3 rounded-lg border border-gray-700 shadow-lg transition"
          title={isFullscreen ? 'Quitter le plein écran' : 'Plein écran'}
        >
          {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>
      </div>
    </div>
  );
};

export default StationMap;
