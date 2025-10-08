export const useAnalytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [timeline, setTimeline] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchAnalytics = useCallback(async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [analyticsData, timelineData] = await Promise.all([
          api.analytics.getOverview(),
          api.analytics.getTimeline(),
        ]);
        
        setAnalytics(analyticsData);
        setTimeline(timelineData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchAnalytics();
    }, [fetchAnalytics]);
  
    return {
      analytics,
      timeline,
      loading,
      error,
      refetch: fetchAnalytics,
    };
  };
  