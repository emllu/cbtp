import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const Header = ({ cartCount }) => {
  return (
    <div className="header">
      <p className="logo">LOGO</p>
      <div className="cart">
        <FaShoppingCart />
        <p>{cartCount}</p>
      </div>
    </div>
  );
};

export default Header;



////////
{/* <div class="header">
<p class="logo">LOGO</p>
<div class="cart"><i class="fa-solid fa-cart-shopping"></i><p id="count">0</p></div>
</div> */}