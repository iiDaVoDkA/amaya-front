import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/products/ProductCard';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist } = useWishlist();
  const { addToCart } = useCart();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page empty">
        <div className="container">
          <div className="empty-wishlist">
            <FiHeart className="empty-icon" />
            <h2>Votre liste de favoris est vide</h2>
            <p>Ajoutez vos bijoux préférés pour les retrouver facilement.</p>
            <Link to="/boutique" className="btn btn-primary">
              Découvrir la Boutique
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header">
          <h1>Mes Favoris</h1>
          <p>{wishlist.length} bijou{wishlist.length > 1 ? 'x' : ''}</p>
        </div>

        <div className="products-grid">
          {wishlist.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
