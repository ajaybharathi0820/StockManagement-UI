import type { MaterialEntry } from '../types';
import '../css/MaterialTable.css';

interface Props {
  entries: MaterialEntry[];
  onDelete: (id: number) => void;
}

export default function MaterialTable({ entries, onDelete }: Props) {
  return (
    <div className="fixed-table-container">
      <table className="material-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Bag Type</th>
            <th>Bag Weight</th>
            <th>Dozens</th>
            <th>Total Weight</th>
            <th>Net Weight</th>
            <th>Avg Weight</th>
            <th>Diff</th>
            <th>Action</th>
          </tr>
        </thead>
      </table>
      <div className="scrollable-table-body">
        <table className="material-table">
          <tbody>
            {entries.map((entry, index) => (
              <tr key={entry.id} >
                <td>{index + 1}</td>
                <td>{entry.itemCode}</td>
                <td>{entry.itemName}</td>
                <td>{entry.bagType}</td>
                <td>{entry.bagWeight.toFixed(3)}</td>
                <td>{entry.dozens}</td>
                <td>{entry.totalWeight.toFixed(3)}</td>
                <td>{entry.netWeight.toFixed(3)}</td>
                <td>{entry.avgWeight.toFixed(3)}</td>
                <td>{entry.toleranceDiff.toFixed(3)}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(entry.id)}
                    title="Delete"
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
