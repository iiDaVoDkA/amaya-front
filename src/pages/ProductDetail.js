import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiCheck, FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { getProduct } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const response = await getProduct(slug);
      console.log('Product loaded:', response.data);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      // Navigate to shop if product not found
      if (error.response?.status === 404) {
        setTimeout(() => navigate('/boutique'), 2000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedVariant);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity, selectedVariant);
      navigate('/panier');
    }
  };

  if (isLoading) {
    return (
      <div className="product-detail-page loading">
        <div className="container">
          <div className="product-detail-skeleton">
            <div className="skeleton skeleton-image-large"></div>
            <div className="skeleton-content">
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text short"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page error">
        <div className="container">
          <div className="error-message">
            <h2>Produit introuvable</h2>
            <p>Ce produit n'existe pas ou n'est plus disponible.</p>
            <Link to="/boutique" className="btn btn-primary">
              Retour à la boutique
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product._id);
  const images = product.images && product.images.length > 0
    ? product.images
    : [{ url: '/images/placeholder-product.jpg', alt: product.name }];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="product-detail-content">
          {/* Images Section */}
          <div className="product-images">
            <div className="main-image-container">
              <img 
                src={images[currentImageIndex].url} 
                alt={images[currentImageIndex].alt || product.name}
                className="main-image"
              />
              
              {images.length > 1 && (
                <>
                  <button className="image-nav prev" onClick={prevImage}>
                    <FiChevronLeft />
                  </button>
                  <button className="image-nav next" onClick={nextImage}>
                    <FiChevronRight />
                  </button>
                  <div className="image-dots">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="thumbnails">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={image.url} alt={image.alt || product.name} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info-section">
            <div className="product-breadcrumb">
              <span onClick={() => navigate('/boutique')}>Boutique</span>
              <span> / </span>
              <span>{product.collection}</span>
            </div>

            <h1 className="product-title">{product.name}</h1>
            
            <p className="product-collection-badge">{product.collection}</p>
            
            <p className="product-short-desc">{product.shortDescription}</p>

            <div className="product-price-section">
              <div className="price-main">
                <span className="price">{product.price.toFixed(2)} DT</span>
                <span className="delivery-note">+ {product.deliveryPrice} DT livraison</span>
              </div>
              <p className="price-total">Total avec livraison: {product.priceWithDelivery.toFixed(2)} DT</p>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="product-variants">
                <h3>Options</h3>
                <div className="variants-list">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      className={`variant-option ${selectedVariant?.value === variant.value ? 'active' : ''}`}
                      onClick={() => setSelectedVariant(variant)}
                    >
                      {variant.value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="product-quantity">
              <h3>Quantité</h3>
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="product-actions">
              <button className="btn btn-primary btn-large" onClick={handleAddToCart}>
                <FiShoppingCart /> Ajouter au panier
              </button>
              <button className="btn btn-secondary btn-large" onClick={handleBuyNow}>
                Acheter maintenant
              </button>
              <button 
                className={`btn-wishlist ${inWishlist ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
              >
                {inWishlist ? <FaHeart /> : <FiHeart />}
              </button>
            </div>

            <Link to="/contact" className="btn btn-outline btn-large" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              Une question ? Nous contacter
            </Link>

            {/* Product Details */}
            <div className="product-details">
              <h3>Description</h3>
              <p>{product.description}</p>

              <h3>Détails du produit</h3>
              <ul className="details-list">
                <li><FiCheck /> <strong>Matériau:</strong> {product.material}</li>
                <li><FiCheck /> <strong>Type:</strong> {product.category}</li>
                {product.details?.size && (
                  <li><FiCheck /> <strong>Taille:</strong> {product.details.size}</li>
                )}
                {product.details?.adjustable && (
                  <li><FiCheck /> <strong>Ajustable:</strong> Oui</li>
                )}
              </ul>

              <h3>Entretien</h3>
              <p>{product.details?.care}</p>

              <div className="product-message">
                <p className="emotional-message"><FiStar /> Un bijou à offrir ou à s'offrir</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
