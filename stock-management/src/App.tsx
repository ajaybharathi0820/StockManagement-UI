// App.tsx
import { Routes, Route } from 'react-router-dom';
import './App.css';
import MaterialEntryPage from './pages/MaterialEntryPage';
import PolisherManagePage from './pages/PolisherManagePage';
import BagTypeManagePage from './pages/BagTypeManagePage';
import ItemManagePage from './pages/ItemManagePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/StockManagement/" element={<MaterialEntryPage />} />
        <Route path="/StockManagement/manage/polisher" element={<PolisherManagePage />} />
        <Route path="/StockManagement/manage/bag-type" element={<BagTypeManagePage />} />
        <Route path="/StockManagement/manage/item" element={<ItemManagePage />} />
      </Routes>
    </div>
  );
}

export default App;
