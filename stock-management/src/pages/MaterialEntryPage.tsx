// MaterialEntryPage.tsx
import { useState } from 'react';
import MaterialTable from '../components/MaterialTable';
import PolisherDropdown from '../components/PolisherDropdown';
import EntryForm from '../components/EntryForm';
import PopupModal from '../components/PopupModal';
import ReportModal from '../components/ReportModal';
import { items, polishers, bagTypes } from '../data/masters';
import type { MaterialEntry } from '../types';
import '../App.css';

export default function MaterialEntryPage() {
  const [polisher, setPolisher] = useState<string>('');
  const [entries, setEntries] = useState<MaterialEntry[]>([]);
  const [modalEntry, setModalEntry] = useState<MaterialEntry | null>(null);
  const [formData, setFormData] = useState<Partial<MaterialEntry> | null>(null);
  const [showReport, setShowReport] = useState(false);

  const handleAddEntry = (entry: MaterialEntry) => {
    const toleranceLimit = entry.avgWeight * 0.02;
    if (Math.abs(entry.toleranceDiff) > toleranceLimit) {
      setModalEntry(entry);
    } else {
      setEntries(prev => [...prev, entry]);
    }
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
    if (confirmDelete) {
      setEntries(prev => prev.filter(e => e.id !== id));
    }
  };

  const handleRecheck = (entry: MaterialEntry) => {
    setEntries(prev => prev.filter(e => e.id !== entry.id));
    setFormData(entry);
    setModalEntry(null);
  };

  const handleCloseModal = () => {
    setModalEntry(null);
  };

  return (
    <div className="app-container">
      <div className="fixed-top-controls">
        <div className="grid-layout">
          <div className="top-controls-row">
            <PolisherDropdown polishers={polishers} selectedId={polisher} onChange={setPolisher} />
            {entries.length > 0 && (
              <button className="generate-report-btn" onClick={() => setShowReport(true)}>
                Generate Report
              </button>
            )}
          </div>
        </div>
        <EntryForm items={items} bagTypes={bagTypes} onAdd={handleAddEntry} initialData={formData} />
      </div>

      <div className="scrollable-content">
        {entries.length > 0 && (
          <MaterialTable entries={entries} onDelete={handleDelete} />
        )}

        {modalEntry && (
          <PopupModal
            entry={modalEntry}
            onClose={handleCloseModal}
            onRecheck={handleRecheck}
          />
        )}

        {showReport && (
          <ReportModal
            polisherName={polisher}
            entries={entries}
            onClose={() => setShowReport(false)}
          />
        )}
      </div>
    </div>
  );
}
