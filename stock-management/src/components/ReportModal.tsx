import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../css/ReportModal.css'; // Make sure path is correct
import type { MaterialEntry } from '../types';

interface Props {
  polisherName: string;
  entries: MaterialEntry[];
  onClose: () => void;
}

export default function ReportModal({ polisherName, entries, onClose }: Props) {
  const totalDozens = entries.reduce((sum, e) => sum + e.dozens, 0);
  const totalWeight = entries.reduce((sum, e) => sum + e.totalWeight, 0);
  const totalNet = entries.reduce((sum, e) => sum + e.netWeight, 0);

  const handleExport = () => {
    const doc = new jsPDF();
    doc.text(`Polisher Report: ${polisherName}`, 14, 20);
    autoTable(doc, {
      head: [['Item', 'Dozens', 'Total Weight', 'Net Weight', 'Avg/Dozen', 'Diff']],
      body: entries.map(e => [
        e.itemName,
        e.dozens,
        e.totalWeight.toFixed(3),
        e.netWeight.toFixed(3),
        e.avgWeight.toFixed(3),
        `${e.toleranceDiff.toFixed(3)}`
      ]),
      foot: [['Total', totalDozens, totalWeight.toFixed(3), totalNet.toFixed(3), '', '']],
      startY: 30,
    });
    doc.save(`report_${polisherName}.pdf`);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Polisher: {polisherName}</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Dozens</th>
              <th>Total Weight</th>
              <th>Net Weight</th>
              <th>Avg/Dozen</th>
              <th>Diff</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id} className={Math.abs(e.toleranceDiff) > 2 ? 'highlight' : ''}>
                <td>{e.itemName}</td>
                <td>{e.dozens}</td>
                <td>{e.totalWeight.toFixed(3)}</td>
                <td>{e.netWeight.toFixed(3)}</td>
                <td>{e.avgWeight.toFixed(3)}</td>
                <td>{e.toleranceDiff.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td><strong>Total</strong></td>
              <td>{totalDozens}</td>
              <td>{totalWeight.toFixed(3)}</td>
              <td>{totalNet.toFixed(3)}</td>
              <td colSpan={2}></td>
            </tr>
          </tfoot>
        </table>

        <div className="modal-buttons">
          <button onClick={handleExport}>Export</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
