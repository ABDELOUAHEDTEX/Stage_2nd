import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Configuration Axios
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour gérer les erreurs globalement
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ============================================
// STATIONS API
// ============================================

export const stationsAPI = {
  /**
   * Récupère toutes les stations avec filtres optionnels
   */
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const response = await axiosInstance.get(`/stations?${params}`);
    return response.data;
  },

  /**
   * Récupère une station par ID
   */
  getById: async (id) => {
    const response = await axiosInstance.get(`/stations/${id}`);
    return response.data;
  },

  /**
   * Recherche de stations par terme
   */
  search: async (searchTerm) => {
    const response = await axiosInstance.get(`/stations/search?q=${searchTerm}`);
    return response.data;
  },
};

// ============================================
// ANALYTICS API
// ============================================

export const analyticsAPI = {
  /**
   * Récupère les statistiques globales
   */
  getOverview: async () => {
    const response = await axiosInstance.get('/analytics');
    return response.data;
  },

  /**
   * Récupère l'évolution temporelle
   */
  getTimeline: async () => {
    const response = await axiosInstance.get('/timeline');
    return response.data;
  },

  /**
   * Récupère les statistiques par province
   */
  getByProvince: async () => {
    const response = await axiosInstance.get('/analytics/province');
    return response.data;
  },

  /**
   * Récupère les statistiques par société
   */
  getBySociete: async () => {
    const response = await axiosInstance.get('/analytics/societe');
    return response.data;
  },
};

// ============================================
// MAP API
// ============================================

export const mapAPI = {
  /**
   * Récupère les données pour la carte
   */
  getMapData: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await axiosInstance.get(`/map-data?${params}`);
    return response.data;
  },

  /**
   * Récupère les clusters géographiques
   */
  getClusters: async () => {
    const response = await axiosInstance.get('/map/clusters');
    return response.data;
  },
};

// ============================================
// FILTERS API
// ============================================

export const filtersAPI = {
  /**
   * Récupère toutes les options de filtres
   */
  getOptions: async () => {
    const response = await axiosInstance.get('/filters');
    return response.data;
  },
};

// ============================================
// EXPORT API
// ============================================

export const exportAPI = {
  /**
   * Télécharge un rapport PDF
   */
  downloadPDF: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await axiosInstance.get(`/export/pdf?${params}`, {
      responseType: 'blob',
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `rapport_stations_${Date.now()}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  /**
   * Télécharge un rapport Excel
   */
  downloadExcel: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await axiosInstance.get(`/export/excel?${params}`, {
      responseType: 'blob',
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `rapport_stations_${Date.now()}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  /**
   * Télécharge les données CSV
   */
  downloadCSV: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await axiosInstance.get(`/export/csv?${params}`, {
      responseType: 'blob',
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `stations_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },
};

// ============================================
// AI RECOMMENDATIONS API
// ============================================

export const aiAPI = {
  /**
   * Récupère les recommandations d'expansion
   */
  getExpansionZones: async () => {
    const response = await axiosInstance.get('/ai/expansion-zones');
    return response.data;
  },

  /**
   * Récupère les anomalies détectées
   */
  getAnomalies: async () => {
    const response = await axiosInstance.get('/ai/anomalies');
    return response.data;
  },

  /**
   * Récupère l'analyse de couverture
   */
  getCoverageAnalysis: async () => {
    const response = await axiosInstance.get('/ai/coverage');
    return response.data;
  },
};

// Export par défaut
export default {
  stations: stationsAPI,
  analytics: analyticsAPI,
  map: mapAPI,
  filters: filtersAPI,
  export: exportAPI,
  ai: aiAPI,
};