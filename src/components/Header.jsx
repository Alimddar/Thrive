import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, CreditCard } from "lucide-react";

const Header = ({ cartCount }) => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/products" className="logo txt-none">
          <CreditCard size={32} />
          <span>Thrive</span>

        </Link>

        <nav className="nav-menu">
          <Link
            to="/products"
            className={`nav-link ${location.pathname === "/" || location.pathname === "/products" ? "active" : ""}`}
          >
            Məhsullar
          </Link>
          <Link
            to="/profile"
            className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`}
          >
            Profil
          </Link>
          <Link
            to="/dashboard"
            className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`}
          >
            İdarə Paneli
          </Link>
           <Link
            to="/history"
            className={`nav-link ${location.pathname === "/history" ? "active" : ""}`}
          >
            Tarixçə
          </Link>
             <Link
            to="/about"
            className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
          >
            Haqqımızda
          </Link>
        </nav>

        <div className="header-actions">
          <Link to="/profile" className="icon-button txt-none">
            <User size={20} />
            <span>Hesabım</span>
          </Link>
          <Link to="/cart" className="icon-button cart-button txt-none">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
