export const QuickFilters = ({ onFilterSelect }) => {
    const quickFilters = [
      { label: 'Toutes', filter: {} },
      { label: 'Actives', filter: { etat: 'en activité' } },
      { label: 'En arrêt', filter: { etat: 'en arrêt' } },
      { label: 'Urbaines', filter: { urbain: true } },
    ];
    
    const [active, setActive] = useState(0);
    
    const handleClick = (index, filter) => {
      setActive(index);
      onFilterSelect(filter);
    };
    
    return (
      <div className="flex flex-wrap gap-2">
        {quickFilters.map((item, index) => (
          <button
            key={item.label}
            onClick={() => handleClick(index, item.filter)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              active === index
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    );
  };