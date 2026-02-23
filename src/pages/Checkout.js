import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiTruck, FiPackage, FiCreditCard } from 'react-icons/fi';
import { createOrder } from '../services/api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import './Checkout.css';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    deliveryMethod: 'livraison',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const DELIVERY_FEE = 7;
  const subtotal = getCartTotal();
  const deliveryFee = formData.deliveryMethod === 'livraison' ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis';
    if (!formData.email.trim()) {
      newErrors.email = 'Email requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Téléphone requis';
    } else if (!/^[0-9]{8,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Numéro invalide (minimum 8 chiffres)';
    }

    if (formData.deliveryMethod === 'livraison') {
      if (!formData.street.trim()) newErrors.street = 'Adresse requise';
      if (!formData.city.trim()) newErrors.city = 'Ville requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error('Votre panier est vide');
      navigate('/boutique');
      return;
    }

    if (!validate()) {
      toast.error('Veuillez remplir tous les champs requis');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: {
            street: formData.street,
            city: formData.city,
            postalCode: formData.postalCode,
            country: 'Tunisie'
          }
        },
        items: cart.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          variant: item.variant || null
        })),
        deliveryMethod: formData.deliveryMethod,
        notes: formData.notes
      };

      const response = await createOrder(orderData);
      
      // Clear cart
      clearCart();
      
      // Navigate to confirmation page
      navigate(`/commande/${response.data.orderNumber}`);
      
      toast.success('Commande passée avec succès ! 🎉');
      
    } catch (error) {
      console.error('Order error:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la commande');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page empty">
        <div className="container">
          <div className="empty-checkout">
            <h2>Votre panier est vide</h2>
            <p>Ajoutez des produits avant de passer commande</p>
            <button onClick={() => navigate('/boutique')} className="btn btn-primary">
              Découvrir la Boutique
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Finaliser la commande</h1>

        <div className="checkout-content">
          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="checkout-form">
            {/* Personal Information */}
            <div className="form-section">
              <h2>Informations personnelles</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Prénom *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? 'error' : ''}
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label>Nom *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label>Téléphone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="XX XXX XXX"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="form-section">
              <h2>Mode de livraison</h2>
              
              <div className="delivery-options">
                <label className={`delivery-option ${formData.deliveryMethod === 'livraison' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="livraison"
                    checked={formData.deliveryMethod === 'livraison'}
                    onChange={handleChange}
                  />
                  <div className="option-content">
                    <div className="delivery-icon"><FiTruck /></div>
                    <div>
                      <h3>Livraison à domicile</h3>
                      <p>{DELIVERY_FEE} DT - Partout en Tunisie</p>
                    </div>
                  </div>
                  {formData.deliveryMethod === 'livraison' && (
                    <FiCheck className="check-icon" />
                  )}
                </label>

                <label className={`delivery-option ${formData.deliveryMethod === 'en-main-propre' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="en-main-propre"
                    checked={formData.deliveryMethod === 'en-main-propre'}
                    onChange={handleChange}
                  />
                  <div className="option-content">
                    <div className="delivery-icon"><FiPackage /></div>
                    <div>
                      <h3>Remise en main propre</h3>
                      <p>Gratuit - Nous vous contacterons</p>
                    </div>
                  </div>
                  {formData.deliveryMethod === 'en-main-propre' && (
                    <FiCheck className="check-icon" />
                  )}
                </label>
              </div>
            </div>

            {/* Delivery Address */}
            {formData.deliveryMethod === 'livraison' && (
              <div className="form-section">
                <h2>Adresse de livraison</h2>
                
                <div className="form-group">
                  <label>Adresse complète *</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="Rue, numéro, étage..."
                    className={errors.street ? 'error' : ''}
                  />
                  {errors.street && <span className="error-message">{errors.street}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Ville *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>

                  <div className="form-group">
                    <label>Code postal</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="form-section">
              <h2>Notes (optionnel)</h2>
              <div className="form-group">
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Cadeau, message personnalisé, urgence..."
                  rows="4"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-large"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Confirmer la commande'}
            </button>
          </form>

          {/* Order Summary */}
          <div className="checkout-summary">
            <div className="summary-card">
              <h2>Votre commande</h2>

              <div className="order-items">
                {cart.map(item => (
                  <div key={`${item._id}-${item.variant?.value || 'default'}`} className="order-item">
                    <img src={item.images?.[0]?.url || '/images/placeholder-product.jpg'} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Qté: {item.quantity}</p>
                    </div>
                    <span className="item-price">{(item.price * item.quantity).toFixed(2)} DT</span>
                  </div>
                ))}
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row">
                <span>Sous-total</span>
                <span>{subtotal.toFixed(2)} DT</span>
              </div>

              <div className="summary-row">
                <span>Livraison</span>
                <span>{deliveryFee.toFixed(2)} DT</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row total">
                <span>Total</span>
                <span>{total.toFixed(2)} DT</span>
              </div>

              <div className="payment-note">
                <p><FiCreditCard /> Paiement à la livraison</p>
                <p className="note-text">Vous payerez lors de la réception de votre commande</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
