import React, { useState } from 'react';
import { BarChart3, Map, List, TrendingUp, Menu, X } from 'lucide-react';

// Hooks
import { useStations } from './hooks/useStations';
import { useAnalytics } from './hooks/useAnalytics';
import { useFilters } from './hooks/useFilters';


// Components
import { StatsGrid } from './components/Dashboard/StatsGrid';

import { FilterPanel } from './components/Filters/FilterPanel';
import { SearchBar } from './components/Filters/SearchBar';
import { AdvancedFilterModal } from './components/Filters/AdvancedFilterModal';
import { DateRangePicker } from './components/Filters/DateRangePicker';
import { Select } from './components/Filters/Select';
import { QuickFilters } from './components/Filters/QuickFilters';
import { TimelineChart, StationPieChart, ProvinceBarChart, StatusDonutChart, ChartContainer } from './components/Charts/TimelineChart';


import { StationMap } from './components/Map/StationMap';
import { ExportButtons } from './components/Export/ExportButtons';

import { Button, Loading, Card, Modal } from './components/UI';

function App() {
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard', 'map', 'list'
  const [selectedStation, setSelectedStation] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch data
  const { filterOptions, loading: filtersLoading } = useFilters();
  const { analytics, timeline, loading: analyticsLoading } = useAnalytics();
  const { 
    stations, 
    loading: stationsLoading, 
    filters,
    updateFilters,
    clearFilters
  } = useStations({});

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'map', label: 'Carte', icon: Map },
    { id: 'list', label: 'Liste', icon: List },
  ];

  // Prepare chart data
  const provinceData = analytics?.by_province 
    ? Object.entries(analytics.by_province).map(([name, value]) => ({ name, value }))
    : [];

  const societeData = analytics?.by_societe
    ? Object.entries(analytics.by_societe).map(([name, value]) => ({ name, value }))
    : [];

  const typeData = analytics?.by_type
    ? Object.entries(analytics.by_type).map(([name, value]) => ({ name, value }))
    : [];

  // Filter stations based on search term
  const filteredStations = stations.filter(station =>
    station.societe?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.adresse?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.province_prefecture?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStationClick = (station) => {
    setSelectedStation(station);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Vue d'ensemble des stations de la région</p>
        </div>
        <ExportButtons filters={filters} />
      </div>

      {/* Stats Grid */}
      <StatsGrid analytics={analytics} loading={analyticsLoading} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timeline Chart */}
        <ChartContainer
          title="Évolution des Stations"
          subtitle="Création des stations par année"
        >
          <TimelineChart data={timeline} height={300} />
        </ChartContainer>

        {/* Status Donut Chart */}
        <ChartContainer
          title="Répartition par Statut"
          subtitle="Stations actives vs en arrêt"
        >
          <StatusDonutChart
            actives={analytics?.stations_actives || 0}
            inactives={analytics?.stations_arret || 0}
            height={300}
          />
        </ChartContainer>

        {/* Province Distribution */}
        <ChartContainer
          title="Répartition par Province"
          subtitle="Top 10 des provinces"
        >
          <ProvinceBarChart data={provinceData} height={300} />
        </ChartContainer>

        {/* Company Distribution */}
        <ChartContainer
          title="Répartition par Société"
          subtitle="Top 10 des sociétés"
        >
          <StationPieChart data={societeData} height={300} />
        </ChartContainer>
      </div>
    </div>
  );

  const renderMap = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Carte des Stations</h1>
          <p className="text-gray-400 mt-1">Localisation géographique des stations</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Rechercher une station..."
          />
          <ExportButtons filters={filters} />
        </div>
      </div>

      {/* Map */}
      <Card className="p-0 overflow-hidden">
        <StationMap
          stations={filteredStations}
          onStationClick={handleStationClick}
          height="600px"
        />
      </Card>
    </div>
  );

  const renderList = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Liste des Stations</h1>
          <p className="text-gray-400 mt-1">{filteredStations.length} stations trouvées</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Rechercher une station..."
          />
          <ExportButtons filters={filters} />
        </div>
      </div>

      {/* Filters */}
      <FilterPanel
        filters={filters}
        onFilterChange={updateFilters}
        onClearFilters={clearFilters}
        filterOptions={filterOptions}
        loading={filtersLoading}
      />

      {/* Stations Table */}
      <Card>
        <StationsTable
          stations={filteredStations}
          loading={stationsLoading}
          onStationClick={handleStationClick}
        />
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return renderDashboard();
      case 'map':
        return renderMap();
      case 'list':
        return renderList();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-gray-800 border-r border-gray-700 flex flex-col overflow-hidden`}>
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-blue-400">Smart Stations</h1>
          <p className="text-sm text-gray-400 mt-1">Béni Mellal-Khénifra</p>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-700">
          <div className="text-xs text-gray-500">
            <p>Version 1.0.0</p>
            <p>© 2024 Smart Stations</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-white transition"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="text-sm text-gray-400">
              {analytics && (
                <span>
                  {analytics.total_stations} stations • 
                  {analytics.stations_actives} actives • 
                  {analytics.stations_arret} en arrêt
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-400">
              Dernière mise à jour: {new Date().toLocaleString('fr-FR')}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>

      {/* Station Detail Modal */}
      <Modal
        isOpen={!!selectedStation}
        onClose={() => setSelectedStation(null)}
        title="Détails de la Station"
        size="lg"
      >
        {selectedStation && (
          <StationDetailCard station={selectedStation} />
        )}
      </Modal>
    </div>
  );
}

export default App;
