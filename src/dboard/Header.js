import React from 'react';
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from 'react-icons/bs';
import { Dropdown } from 'react-bootstrap';
import './db.css';

function Header({ OpenSidebar, adminEmail }) {
  return (
    <header className="headers">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <BsSearch className="icon" />
      </div>
      <div className="headers-right">
        <BsFillBellFill className="icon" />
        <BsFillEnvelopeFill className="icon" />

        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            <BsPersonCircle className="icon" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item disabled>{adminEmail}</Dropdown.Item> {/* Display the admin's email */}
            <Dropdown.Divider /> {/* Divider to separate items */}
            <Dropdown.Item href="/signout">Sign Out</Dropdown.Item> {/* Link to sign out */}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
}

export default Header;
