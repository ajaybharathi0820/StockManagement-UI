// ItemManager.tsx
import { useState } from 'react';
import '../css/MaterialTable.css';
import type { Item } from '../types';

export default function ItemManagePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [standardWeight, setStandardWeight] = useState<number | ''>('');
  const [editCode, setEditCode] = useState<string | null>(null);

  const handleAdd = () => {
    const trimmedName = name.trim();
    const trimmedCode = code.trim();

    if (!trimmedCode || !trimmedName) {
      alert('Item code and name are required');
      return;
    }
    if (!/^[A-Za-z0-9]+$/.test(trimmedCode)) {
      alert('Item code must be alphanumeric');
      return;
    }
    if (!/^[A-Za-z ]+$/.test(trimmedName)) {
      alert('Item name must contain only letters and spaces');
      return;
    }
    if (standardWeight === '' || isNaN(Number(standardWeight)) || Number(standardWeight) <= 0) {
      alert('Standard weight must be a positive number');
      return;
    }

    if (editCode !== null) {
      setItems(prev => prev.map(i => i.code === editCode ? { code: trimmedCode, name: trimmedName, standardWeight: Number(standardWeight) } : i));
      setEditCode(null);
    } else {
      const newItem: Item = {
        code: trimmedCode,
        name: trimmedName,
        standardWeight: Number(standardWeight),
      };
      setItems(prev => [...prev, newItem]);
    }

    setCode('');
    setName('');
    setStandardWeight('');
  };

  const handleEdit = (item: Item) => {
    setEditCode(item.code);
    setCode(item.code);
    setName(item.name);
    setStandardWeight(item.standardWeight);
  };

  const handleDelete = (code: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      setItems(prev => prev.filter(i => i.code !== code));
    }
  };

  return (
    <div className="app-main">
      <h2>Item Management</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter item code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter standard weight"
          value={standardWeight}
          onChange={(e) => setStandardWeight(Number(e.target.value))}
        />
        <button onClick={handleAdd}>{editCode !== null ? 'Update' : 'Add'}</button>
      </div>

      <div className="fixed-table-container">
        <table className="material-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Standard Weight</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i, index) => (
              <tr key={i.code}>
                <td>{index + 1}</td>
                <td>{i.code}</td>
                <td>{i.name}</td>
                <td>{i.standardWeight.toFixed(3)}</td>
                <td>
                  <button onClick={() => handleEdit(i)}>Edit</button>
                  <button onClick={() => handleDelete(i.code)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
