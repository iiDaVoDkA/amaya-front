import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiCreditCard, FiTruck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const DELIVERY_FEE = 7;
  const subtotal = getCartTotal();
  const total = subtotal + (cart.length > 0 ? DELIVERY_FEE : 0);

  if (cart.length === 0) {
    return (
      <div className="cart-page empty">
        <div className="container">
          <div className="empty-cart">
            <FiShoppingBag className="empty-icon" />
            <h2>Votre panier est vide</h2>
            <p>Découvrez nos créations et ajoutez vos bijoux favoris.</p>
            <Link to="/boutique" className="btn btn-primary">
              Découvrir la Boutique
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Mon Panier</h1>
          <button onClick={clearCart} className="btn btn-text">
            Vider le panier
          </button>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            {cart.map((item) => (
              <div key={`${item._id}-${item.variant?.value || 'default'}`} className="cart-item">
                <div className="item-image">
                  <img 
                    src={item.images?.[0]?.url || '/images/placeholder-product.jpg'} 
                    alt={item.name}
                  />
                </div>

                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p className="item-collection">{item.collection}</p>
                  {item.variant && (
                    <p className="item-variant">{item.variant.name}: {item.variant.value}</p>
                  )}
                </div>

                <div className="item-quantity">
                  <button 
                    onClick={() => updateQuantity(item._id, item.quantity - 1, item.variant)}
                    aria-label="Diminuer la quantité"
                  >
                    <FiMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item._id, item.quantity + 1, item.variant)}
                    aria-label="Augmenter la quantité"
                  >
                    <FiPlus />
                  </button>
                </div>

                <div className="item-price">
                  <span className="price">{(item.price * item.quantity).toFixed(2)} DT</span>
                  <span className="unit-price">{item.price.toFixed(2)} DT / unité</span>
                </div>

                <button 
                  className="item-remove"
                  onClick={() => removeFromCart(item._id, item.variant)}
                  aria-label="Supprimer"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="summary-card">
              <h2>Récapitulatif</h2>

              <div className="summary-row">
                <span>Sous-total ({cart.reduce((acc, item) => acc + item.quantity, 0)} articles)</span>
                <span>{subtotal.toFixed(2)} DT</span>
              </div>

              <div className="summary-row">
                <span>Frais de livraison</span>
                <span>{DELIVERY_FEE.toFixed(2)} DT</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row total">
                <span>Total</span>
                <span>{total.toFixed(2)} DT</span>
              </div>

              <button 
                className="btn btn-primary btn-large"
                onClick={() => navigate('/commander')}
              >
                Passer la commande
              </button>

              <Link to="/boutique" className="btn btn-outline btn-large">
                Continuer mes achats
              </Link>

              <div className="payment-info">
                <p><FiCreditCard /> Paiement à la livraison disponible</p>
                <p><FiTruck /> Livraison partout en Tunisie</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
