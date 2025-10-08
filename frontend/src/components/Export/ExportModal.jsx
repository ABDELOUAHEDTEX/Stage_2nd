import React, { useState } from 'react';
import { FileText, FileSpreadsheet, FileType, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button, Modal, Alert } from '../UI';

// ============================================
// Export Modal Component
// ============================================

export const ExportModal = ({
  isOpen,
  onClose,
  filters,
  exporting,
  error,
  onExportPDF,
  onExportExcel,
  onExportCSV
}) => {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [success, setSuccess] = useState(false);

  const formats = [
    {
      id: 'pdf',
      name: 'PDF',
      icon: FileText,
      description: 'Rapport complet avec graphiques',
      color: 'text-red-400',
      bgColor: 'bg-red-900/20',
    },
    {
      id: 'excel',
      name: 'Excel',
      icon: FileSpreadsheet,
      description: 'Fichier Excel avec plusieurs feuilles',
      color: 'text-green-400',
      bgColor: 'bg-green-900/20',
    },
    {
      id: 'csv',
      name: 'CSV',
      icon: FileType,
      description: 'Données brutes (compatible Excel)',
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
    },
  ];

  const handleExport = async () => {
    setSuccess(false);
    
    try {
      switch (selectedFormat) {
        case 'pdf':
          await onExportPDF(filters);
          break;
        case 'excel':
          await onExportExcel(filters);
          break;
        case 'csv':
          await onExportCSV(filters);
          break;
      }
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Export error:', err);
    }
  };

  const activeFiltersCount = Object.values(filters).filter(v => v).length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Exporter les données"
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button
            variant="primary"
            onClick={handleExport}
            disabled={exporting}
            loading={exporting}
          >
            {exporting ? 'Export en cours...' : 'Exporter'}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Success Message */}
        {success && (
          <Alert
            type="success"
            title="Export réussi"
            message="Votre fichier a été téléchargé avec succès"
          />
        )}

        {/* Error Message */}
        {error && (
          <Alert
            type="error"
            title="Erreur d'export"
            message={error}
          />
        )}

        {/* Format Selection */}
        <div>
          <h3 className="text-sm font-semibold text-gray-300 mb-3">
            Choisir le format d'export
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {formats.map((format) => {
              const Icon = format.icon;
              const isSelected = selectedFormat === format.id;

              return (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  disabled={exporting}
                  className={`relative flex items-start gap-4 p-4 rounded-lg border-2 transition ${
                    isSelected
                      ? 'border-blue-500 bg-blue-900/20'
                      : 'border-gray-700 hover:border-gray-600 bg-gray-800'
                  } ${exporting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className={`p-3 rounded-lg ${format.bgColor}`}>
                    <Icon className={format.color} size={24} />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-white">{format.name}</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      {format.description}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="text-blue-500" size={20} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filters Info */}
        {activeFiltersCount > 0 && (
          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-blue-400 flex-shrink-0 mt-0.5" size={18} />
              <div className="flex-1">
                <p className="text-sm text-blue-300 font-medium">
                  {activeFiltersCount} filtre{activeFiltersCount > 1 ? 's' : ''} actif{activeFiltersCount > 1 ? 's' : ''}
                </p>
                <p className="text-xs text-blue-400 mt-1">
                  L'export inclura uniquement les données filtrées
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Export Info */}
        <div className="bg-gray-700/30 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-300 mb-2">
            Contenu de l'export
          </h4>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>• Informations complètes des stations</li>
            <li>• Statistiques et analyses</li>
            {selectedFormat !== 'csv' && <li>• Graphiques et visualisations</li>}
            <li>• Répartition par province et société</li>
          </ul>
        </div>

        {/* Progress Indicator */}
        {exporting && (
          <div className="flex items-center justify-center gap-3 py-4">
            <Loader2 className="animate-spin text-blue-500" size={24} />
            <span className="text-gray-300">Génération en cours...</span>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ExportModal;
