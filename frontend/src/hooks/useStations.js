/**
 * Custom Hooks pour la gestion des données
 */

import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

// ============================================
// useStations Hook
// ============================================

export const useStations = (initialFilters = {}) => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
  });

  const fetchStations = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await api.stations.getAll({
        ...filters,
        skip: (pagination.page - 1) * pagination.limit,
        limit: pagination.limit,
      });
      
      setStations(data);
      setPagination(prev => ({ ...prev, total: data.length }));
    } catch (err) {
      setError(err.message);
      console.error('Error fetching stations:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.limit]);

  useEffect(() => {
    fetchStations();
  }, [fetchStations]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({});
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const nextPage = () => {
    setPagination(prev => ({ ...prev, page: prev.page + 1 }));
  };

  const prevPage = () => {
    setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }));
  };

  const goToPage = (page) => {
    setPagination(prev => ({ ...prev, page }));
  };

  return {
    stations,
    loading,
    error,
    filters,
    pagination,
    updateFilters,
    clearFilters,
    refetch: fetchStations,
    nextPage,
    prevPage,
    goToPage,
  };
};