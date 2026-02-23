import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  // Use placeholder if no image
  const imageUrl = product.images && product.images[0]?.url 
    ? product.images[0].url 
    : '/images/placeholder-product.jpg';

  return (
    <div className="product-card">
      <Link to={`/produit/${product.slug}`} className="product-card-link">
        <div className="product-image-container">
          <img 
            src={imageUrl} 
            alt={product.name}
            className="product-image"
            onError={(e) => {
              e.target.src = '/images/placeholder-product.jpg';
            }}
          />
          {product.isFeatured && (
            <span className="product-badge">Populaire</span>
          )}
          <button 
            className="wishlist-button"
            onClick={handleToggleWishlist}
            aria-label={inWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            {inWishlist ? <FaHeart /> : <FiHeart />}
          </button>
        </div>

        <div className="product-info">
          <p className="product-collection">{product.collection}</p>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-short-description">{product.shortDescription}</p>
          
          <div className="product-footer">
            <div className="product-price">
              <span className="price-amount">{product.price.toFixed(2)} DT</span>
              <span className="price-note">+ {product.deliveryPrice} DT livraison</span>
            </div>
            <button 
              className="add-to-cart-button"
              onClick={handleAddToCart}
              aria-label="Ajouter au panier"
            >
              <FiShoppingCart />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
