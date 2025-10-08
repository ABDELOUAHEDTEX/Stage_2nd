export const useFilters = () => {
    const [filterOptions, setFilterOptions] = useState({
      provinces: [],
      societes: [],
      types: [],
      etats: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchFilterOptions = useCallback(async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await api.filters.getOptions();
        setFilterOptions(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching filter options:', err);
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchFilterOptions();
    }, [fetchFilterOptions]);
  
    return {
      filterOptions,
      loading,
      error,
      refetch: fetchFilterOptions,
    };
  };