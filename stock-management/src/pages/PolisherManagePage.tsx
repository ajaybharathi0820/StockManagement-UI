// PolisherManager.tsx
import { useState } from 'react';
import '../css/MaterialTable.css';
import type { Polisher } from '../types';

export default function PolisherManager() {
  const [polishers, setPolishers] = useState<Polisher[]>([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const handleAdd = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      alert('Polisher name cannot be empty');
      return;
    }
    if (!/^[A-Za-z ]+$/.test(trimmedName)) {
      alert('Polisher name must contain only letters and spaces');
      return;
    }

    if (editId !== null) {
      setPolishers(prev => prev.map(p => p.id === editId ? { ...p, name: trimmedName } : p));
      setEditId(null);
    } else {
      const newPolisher: Polisher = {
        id: Date.now(),
        name: trimmedName,
      };
      setPolishers(prev => [...prev, newPolisher]);
    }
    setName('');
  };

  const handleEdit = (polisher: Polisher) => {
    setEditId(polisher.id);
    setName(polisher.name);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this polisher?');
    if (confirmDelete) {
      setPolishers(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="app-main">
      <h2>Polisher Management</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter polisher name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleAdd}>{editId !== null ? 'Update' : 'Add'}</button>
      </div>

      <div className="fixed-table-container">
        <table className="material-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Polisher Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {polishers.map((p, index) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.name}</td>
                <td>
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
