// BagTypeManager.tsx
import { useState } from 'react';
import '../css/MaterialTable.css';
import type { BagType } from '../types';

export default function BagTypeManagePage() {
  const [bagTypes, setBagTypes] = useState<BagType[]>([]);
  const [type, setType] = useState('');
  const [weight, setWeight] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const handleAdd = () => {
    const trimmedType = type.trim();
    const parsedWeight = parseFloat(weight);

    if (!trimmedType || !/^[A-Za-z ]+$/.test(trimmedType)) {
      alert('Bag Type must contain only letters and spaces');
      return;
    }
    if (isNaN(parsedWeight) || parsedWeight <= 0) {
      alert('Weight must be a positive number');
      return;
    }

    if (editId !== null) {
      setBagTypes(prev =>
        prev.map(b => (b.id === editId ? { ...b, type: trimmedType, weight: parsedWeight } : b))
      );
      setEditId(null);
    } else {
      const newBag: BagType = {
        id: Date.now(),
        type: trimmedType,
        weight: parsedWeight,
      };
      setBagTypes(prev => [...prev, newBag]);
    }

    setType('');
    setWeight('');
  };

  const handleEdit = (bag: BagType) => {
    setEditId(bag.id);
    setType(bag.type);
    setWeight(bag.weight.toString());
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this bag type?')) {
      setBagTypes(prev => prev.filter(b => b.id !== id));
    }
  };

  return (
    <div className="app-main">
      <h2>Bag Type Management</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter bag type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <button onClick={handleAdd}>{editId !== null ? 'Update' : 'Add'}</button>
      </div>

      <div className="fixed-table-container">
        <table className="material-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Bag Type</th>
              <th>Weight</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bagTypes.map((b, index) => (
              <tr key={b.id}>
                <td>{index + 1}</td>
                <td>{b.type}</td>
                <td>{b.weight.toFixed(3)}</td>
                <td>
                  <button onClick={() => handleEdit(b)}>Edit</button>
                  <button onClick={() => handleDelete(b.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
