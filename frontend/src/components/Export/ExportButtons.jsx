import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, FileType } from 'lucide-react';
import { Button, Alert } from '../UI';
import { ExportModal } from './ExportModal';
import { useExport } from '../../hooks/useStations';

// ============================================
// Export Buttons Component
// ============================================

export const ExportButtons = ({ filters = {} }) => {
  const [showModal, setShowModal] = useState(false);
  const { exporting, error, exportPDF, exportExcel, exportCSV } = useExport();

  return (
    <>
      <Button
        variant="primary"
        icon={Download}
        onClick={() => setShowModal(true)}
      >
        Exporter
      </Button>

      {showModal && (
        <ExportModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          filters={filters}
          exporting={exporting}
          error={error}
          onExportPDF={exportPDF}
          onExportExcel={exportExcel}
          onExportCSV={exportCSV}
        />
      )}
    </>
  );
};


// ============================================
// Quick Export Button (Single Format)
// ============================================

export const QuickExportButton = ({ format = 'pdf', filters = {}, label }) => {
  const { exporting, error, exportPDF, exportExcel, exportCSV } = useExport();
  const [showToast, setShowToast] = useState(false);

  const formatConfig = {
    pdf: { icon: FileText, action: exportPDF, color: 'red' },
    excel: { icon: FileSpreadsheet, action: exportExcel, color: 'green' },
    csv: { icon: FileType, action: exportCSV, color: 'blue' },
  };

  const config = formatConfig[format];
  const Icon = config.icon;

  const handleExport = async () => {
    try {
      await config.action(filters);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error('Export error:', err);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={handleExport}
        disabled={exporting}
        loading={exporting}
        icon={Icon}
      >
        {label || `Export ${format.toUpperCase()}`}
      </Button>

      {showToast && !error && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
          <Alert
            type="success"
            title="Export réussi"
            message="Votre fichier a été téléchargé"
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
    </>
  );
};

// ============================================
// Batch Export Component (Multiple Formats)
// ============================================

export const BatchExportButtons = ({ filters = {} }) => {
  const { exporting, exportPDF, exportExcel, exportCSV } = useExport();
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [isExporting, setIsExporting] = useState(false);

  const exportAll = async () => {
    setIsExporting(true);
    setProgress({ current: 0, total: 3 });

    try {
      setProgress({ current: 1, total: 3 });
      await exportPDF(filters);

      setProgress({ current: 2, total: 3 });
      await exportExcel(filters);

      setProgress({ current: 3, total: 3 });
      await exportCSV(filters);

      setTimeout(() => {
        setIsExporting(false);
        setProgress({ current: 0, total: 0 });
      }, 1000);
    } catch (err) {
      console.error('Batch export error:', err);
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        variant="primary"
        onClick={exportAll}
        disabled={isExporting}
        loading={isExporting}
        icon={Download}
        className="w-full"
      >
        Exporter Tout (PDF + Excel + CSV)
      </Button>

      {isExporting && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Export en cours...</span>
            <span>{progress.current} / {progress.total}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-500"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
