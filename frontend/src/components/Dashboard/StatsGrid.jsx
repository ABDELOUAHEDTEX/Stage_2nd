export const StatsGrid = ({ analytics, loading }) => {
    if (loading || !analytics) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <KPICard key={i} loading={true} />
          ))}
        </div>
      );
    }
    
    const activationRate = analytics.total_stations > 0 
      ? ((analytics.stations_actives / analytics.total_stations) * 100).toFixed(1)
      : 0;
    
    const stats = [
      {
        title: 'Total Stations',
        value: analytics.total_stations.toLocaleString('fr-FR'),
        subtitle: 'Toutes régions confondues',
        icon: MapPin,
        color: 'blue',
      },
      {
        title: 'Stations Actives',
        value: analytics.stations_actives.toLocaleString('fr-FR'),
        subtitle: `${activationRate}% du total`,
        icon: Activity,
        color: 'green',
        trend: 'up',
        trendValue: activationRate + '%',
      },
      {
        title: 'Stations en Arrêt',
        value: analytics.stations_arret.toLocaleString('fr-FR'),
        subtitle: 'Nécessitent attention',
        icon: AlertCircle,
        color: 'red',
        trend: analytics.stations_arret > 0 ? 'down' : 'neutral',
        trendValue: analytics.stations_arret + ' stations',
      },
      {
        title: 'Provinces Couvertes',
        value: Object.keys(analytics.by_province || {}).length,
        subtitle: 'Béni Mellal-Khénifra',
        icon: Building2,
        color: 'purple',
      },
    ];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <KPICard key={index} {...stat} />
        ))}
      </div>
    );
  };