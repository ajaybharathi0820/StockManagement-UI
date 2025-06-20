import { useState, useEffect } from 'react';
import type { BagType, Item, MaterialEntry } from '../types';
import '../css/EntryForm.css';
import Select from 'react-select';

interface Props {
  items: Item[];
  bagTypes: BagType[];
  onAdd: (entry: MaterialEntry) => void;
  initialData?: Partial<MaterialEntry> | null;
}

let idCounter = 1;

export default function EntryForm({ items, bagTypes, onAdd, initialData }: Props) {
  const [itemCode, setItemCode] = useState('');
  const [itemName, setItemName] = useState('');
  const [bagType, setBagType] = useState('');
  const [dozens, setDozens] = useState<number | ''>('');
  const [totalWeight, setTotalWeight] = useState<number | ''>('');

  const itemOptions = items.map((item) => ({
    value: item.code,
    label: `${item.code} - ${item.name}`,
  }));

  useEffect(() => {
    if (initialData) {
      setItemCode(initialData.itemCode ?? '');
      setItemName(initialData.itemName ?? '');
      setBagType(initialData.bagType ?? '');
      setDozens(initialData.dozens ?? '');
      setTotalWeight(initialData.totalWeight ?? '');
    }
  }, [initialData]);

  useEffect(() => {
    const item = items.find(i => i.code === itemCode);
    if (item) setItemName(item.name);
  }, [itemCode]);

  useEffect(() => {
    const item = items.find(i => i.name === itemName);
    if (item) setItemCode(item.code);
  }, [itemName]);

  const handleAdd = () => {
    const item = items.find(i => i.code === itemCode);
    const bag = bagTypes.find(b => b.type === bagType);
    if (!item || !bag || !dozens || !totalWeight) return;

    const netWeight = totalWeight - bag.weight;
    const avgWeight = netWeight / dozens;
    const toleranceDiff = avgWeight - item.standardWeight;

    const newEntry: MaterialEntry = {
      id: idCounter++,
      itemCode: item.code,
      itemName: item.name,
      bagType: bag.type,
      bagWeight: bag.weight,
      dozens,
      totalWeight,
      netWeight,
      avgWeight,
      toleranceDiff,
    };

    onAdd(newEntry);
    setItemCode('');
    setItemName('');
    setBagType('');
    setDozens('');
    setTotalWeight('');
  };

  return (
    <div className="form-container">
       <div className="form-select-wrapper">
        <Select
          className="form-select-dropdown"
          options={itemOptions}
          value={itemCode ? itemOptions.find(opt => opt.value === itemCode) : null}
          onChange={(selected) => {
            if (selected) {
              const item = items.find(i => i.code === selected.value);
              if (item) {
                setItemCode(item.code);
                setItemName(item.name);
              }
            } else {
              setItemCode('');
              setItemName('');
            }
          }}
          isClearable
          placeholder="Item Name or Code"
        />
      </div>

      <select
        className="form-select"
        value={bagType}
        onChange={(e) => setBagType(e.target.value)}
      >
        <option value="">Select Bag Type</option>
        {bagTypes.map(b => (
          <option key={b.id} value={b.type}>
            {b.type}
          </option>
        ))}
      </select>
      <input
        className="form-input"
        type="number"
        placeholder="Dozens"
        value={dozens}
        onChange={(e) => setDozens(Number(e.target.value))}
      />
      <input
        className="form-input"
        type="number"
        placeholder="Total Weight"
        value={totalWeight}
        onChange={(e) => setTotalWeight(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <button className="form-button" onClick={handleAdd}>
        ➕ Add Entry
      </button>
    </div>
  );
}
