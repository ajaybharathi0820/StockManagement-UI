import type { Polisher } from '../types';
import '../css/PolisherDropdown.css'

interface Props {
  polishers: Polisher[];
  selectedId: string;
  onChange: (id: string) => void;
}

export default function PolisherDropdown({ polishers, selectedId, onChange }: Props) {
  return (
    <div className="polisher-select">
      <label>Select Polisher: </label>
      <select value={selectedId??''} onChange={(e) => onChange(e.target.value)}>
        <option value="">-- Select --</option>
        {polishers.map((p) => (
          <option key={p.name} value={p.name}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}
