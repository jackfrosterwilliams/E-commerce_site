import React from "react";
import logo from "./assets/Logo.png";
import group_icon from "./assets/group-icon.png";
import cart_icon from "./assets/cart-icon.png";
import account_icon from "./assets/account-icon.png";

function Navbar() {
  return (
    <div className="navbar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Collections</a></li>
          <li><a href="/about">About</a></li>
        </ul>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="icon">
          <a href="/wishlist"><img src={group_icon} alt="Wishlist" /></a>
          <a href="/cart"><img src={cart_icon} alt="Cart" /></a>
          <a href="/account"><img src={account_icon} alt="Account" /></a>
        </div>
      </div>
   );
}

export default Navbar;