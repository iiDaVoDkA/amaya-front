import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getCartCount } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container container">
        <div className="navbar-logo">
          <Link to="/" onClick={closeMenu}>
            <h1 className="logo-text">Amaya</h1>
            <p className="logo-subtitle">Bijoux Élégants</p>
          </Link>
        </div>

        <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={closeMenu}>Accueil</Link>
          <Link to="/boutique" onClick={closeMenu}>Boutique</Link>
          <Link to="/a-propos" onClick={closeMenu}>À Propos</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
          <Link to="/livraison" onClick={closeMenu}>Livraison</Link>
          <Link to="/entretien" onClick={closeMenu}>Entretien</Link>
        </div>

        <div className="navbar-icons">
          <button 
            className="icon-button"
            onClick={() => navigate('/favoris')}
            aria-label="Favoris"
          >
            <FiHeart />
            {wishlist.length > 0 && (
              <span className="badge">{wishlist.length}</span>
            )}
          </button>

          <button 
            className="icon-button"
            onClick={() => navigate('/panier')}
            aria-label="Panier"
          >
            <FiShoppingCart />
            {getCartCount() > 0 && (
              <span className="badge">{getCartCount()}</span>
            )}
          </button>

          <button 
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
