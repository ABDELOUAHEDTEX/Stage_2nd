export const useExport = () => {
    const [exporting, setExporting] = useState(false);
    const [error, setError] = useState(null);
  
    const exportPDF = async (filters = {}) => {
      setExporting(true);
      setError(null);
      
      try {
        await api.export.downloadPDF(filters);
      } catch (err) {
        setError(err.message);
        console.error('Error exporting PDF:', err);
      } finally {
        setExporting(false);
      }
    };
  
    const exportExcel = async (filters = {}) => {
      setExporting(true);
      setError(null);
      
      try {
        await api.export.downloadExcel(filters);
      } catch (err) {
        setError(err.message);
        console.error('Error exporting Excel:', err);
      } finally {
        setExporting(false);
      }
    };
  
    const exportCSV = async (filters = {}) => {
      setExporting(true);
      setError(null);
      
      try {
        await api.export.downloadCSV(filters);
      } catch (err) {
        setError(err.message);
        console.error('Error exporting CSV:', err);
      } finally {
        setExporting(false);
      }
    };
  
    return {
      exporting,
      error,
      exportPDF,
      exportExcel,
      exportCSV,
    };
  };