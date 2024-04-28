import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for routing
import { 
  BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill 
} from 'react-icons/bs';
import './db.css';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const navigate = useNavigate(); // Setting up navigate function for routing
  
  return (
    <aside id="sidebars" className={openSidebarToggle ? 'sidebars-responsive' : ''}>
      <div className="sidebars-title">
        <div className="sidebars-brand">
          <BsCart3 className="icon_item" /> SHOP
          
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>X</span>
      </div>

      <ul className="sidebars-list">
        <li className="sidebars-list-item" onClick={() => navigate('/dashboard')}>
          {/* Navigate to dashboard */}
          <BsGrid1X2Fill className="icon" /> <span>Dashboard</span>
        </li>
        <li className="sidebars-list-item" onClick={() => navigate('/products')}>
          {/* Navigate to products */}
          <BsFillArchiveFill className="icon" /> Products
        </li>
        <li className="sidebars-list-item" onClick={() => navigate('/categories')}>
          {/* Navigate to categories */}
          <BsFillGrid3X3GapFill className="icon" /> Categories
        </li>
        <li className="sidebars-list-item" onClick={() => navigate('/Register')}>
          {/* Navigate to customers */}
          <BsPeopleFill className="icon" />Sign up customer
        </li>
        <li className="sidebars-list-item" onClick={() => navigate('/inventory')}>
          {/* Navigate to inventory */}
          <BsListCheck className="icon" /> Inventory
        </li>
        <li className="sidebars-list-item" onClick={() => navigate('/reports')}>
          {/* Navigate to reports */}
          <BsMenuButtonWideFill className="icon" /> Reports
        </li>
        <li className="sidebars-list-item" onClick={() => navigate('/settings')}>
          {/* Navigate to settings */}
          <BsFillGearFill className="icon" /> Setting
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
