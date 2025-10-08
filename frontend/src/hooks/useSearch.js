export const useSearch = (searchTerm) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const debouncedSearch = useDebounce(searchTerm, 300);
  
    useEffect(() => {
      if (!debouncedSearch) {
        setResults([]);
        return;
      }
  
      const search = async () => {
        setLoading(true);
        setError(null);
        
        try {
          const data = await api.stations.search(debouncedSearch);
          setResults(data);
        } catch (err) {
          setError(err.message);
          console.error('Error searching:', err);
        } finally {
          setLoading(false);
        }
      };
  
      search();
    }, [debouncedSearch]);
  
    return { results, loading, error };
  };