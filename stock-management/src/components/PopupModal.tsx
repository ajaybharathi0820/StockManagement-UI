import type { MaterialEntry } from '../types';
import '../css/PopupModal.css';

interface Props {
  entry: MaterialEntry;
  onClose: () => void;
  onRecheck: (entry: MaterialEntry) => void;
}

export default function PopupModal({ entry, onClose, onRecheck }: Props) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>⚠️ Tolerance Exceeded</h3>
        <p><strong>Item:</strong> {entry.itemName}</p>
        <p><strong>Dozens:</strong> {entry.dozens}</p>
        <p><strong>Total Weight:</strong> {entry.totalWeight.toFixed(3)}</p>
        <p><strong>Net Weight:</strong> {entry.netWeight.toFixed(3)}</p>
        <p><strong>Average Weight:</strong> {entry.avgWeight.toFixed(3)}</p>
        <p>
          <strong>Tolerance Difference:</strong>{' '}
          <span className="tolerance-red">{entry.toleranceDiff.toFixed(3)}%</span>
        </p>

        <div className="modal-actions">
          <button className="btn-recheck" onClick={() => onRecheck(entry)}>🔁 Re-enter</button>
          <button className="btn-close" onClick={onClose}>✖ Close</button>
        </div>
      </div>
    </div>
  );
}
