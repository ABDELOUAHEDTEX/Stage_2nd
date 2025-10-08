/**
 * Storage Service - Gestion du stockage local (sans localStorage)
 * Utilise la mémoire pour la session en cours
 */

class StorageService {
    constructor() {
      // Stockage en mémoire
      this.memoryStore = new Map();
      
      // Valeurs par défaut
      this.defaults = {
        filters: {
          province: '',
          societe: '',
          etat: '',
          type_station: '',
        },
        theme: 'dark',
        language: 'fr',
        viewMode: 'grid', // 'grid' ou 'list'
      };
    }
  
    /**
     * Récupère une valeur
     */
    get(key, defaultValue = null) {
      if (this.memoryStore.has(key)) {
        return this.memoryStore.get(key);
      }
      
      // Retourner la valeur par défaut si elle existe
      if (this.defaults[key] !== undefined) {
        return this.defaults[key];
      }
      
      return defaultValue;
    }
  
    /**
     * Définit une valeur
     */
    set(key, value) {
      this.memoryStore.set(key, value);
    }
  
    /**
     * Supprime une valeur
     */
    remove(key) {
      this.memoryStore.delete(key);
    }
  
    /**
     * Vide tout le stockage
     */
    clear() {
      this.memoryStore.clear();
    }
  
    /**
     * Vérifie si une clé existe
     */
    has(key) {
      return this.memoryStore.has(key);
    }
  
    /**
     * Récupère les filtres sauvegardés
     */
    getFilters() {
      return this.get('filters', this.defaults.filters);
    }
  
    /**
     * Sauvegarde les filtres
     */
    setFilters(filters) {
      this.set('filters', filters);
    }
  
    /**
     * Réinitialise les filtres
     */
    resetFilters() {
      this.set('filters', this.defaults.filters);
    }
  
    /**
     * Récupère le thème
     */
    getTheme() {
      return this.get('theme', this.defaults.theme);
    }
  
    /**
     * Change le thème
     */
    setTheme(theme) {
      this.set('theme', theme);
    }
  
    /**
     * Récupère le mode d'affichage
     */
    getViewMode() {
      return this.get('viewMode', this.defaults.viewMode);
    }
  
    /**
     * Change le mode d'affichage
     */
    setViewMode(mode) {
      this.set('viewMode', mode);
    }
  
    /**
     * Récupère les stations récemment consultées
     */
    getRecentStations() {
      return this.get('recentStations', []);
    }
  
    /**
     * Ajoute une station aux récents
     */
    addRecentStation(station) {
      const recent = this.getRecentStations();
      
      // Éviter les doublons
      const filtered = recent.filter(s => s.id !== station.id);
      
      // Ajouter au début et limiter à 10
      const updated = [station, ...filtered].slice(0, 10);
      
      this.set('recentStations', updated);
    }
  
    /**
     * Récupère les favoris
     */
    getFavorites() {
      return this.get('favorites', []);
    }
  
    /**
     * Ajoute/retire un favori
     */
    toggleFavorite(stationId) {
      const favorites = this.getFavorites();
      
      if (favorites.includes(stationId)) {
        this.set('favorites', favorites.filter(id => id !== stationId));
        return false;
      } else {
        this.set('favorites', [...favorites, stationId]);
        return true;
      }
    }
  
    /**
     * Vérifie si une station est en favori
     */
    isFavorite(stationId) {
      return this.getFavorites().includes(stationId);
    }
  }
  
  // Singleton
  const storage = new StorageService();
  
  export default storage;