// Navbar.tsx
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/StockManagement/" className="nav-logo">Raw Material Management</Link>
        <div className="nav-links">
          <Link to="/StockManagement/">Home</Link>
          <div className="dropdown">
            <span className="dropdown-label">Manage</span>
            <div className="dropdown-content">
              <Link to="/StockManagement/manage/polisher">Polisher</Link>
              <Link to="/StockManagement/manage/bag-type">Bag Type</Link>
              <Link to="/StockManagement/manage/item">Item</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
