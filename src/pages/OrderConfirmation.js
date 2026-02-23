import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiCheck, FiPackage, FiMail } from 'react-icons/fi';
import { getOrder } from '../services/api';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchOrder();
  }, [orderNumber]);

  const fetchOrder = async () => {
    try {
      const response = await getOrder(orderNumber);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="order-confirmation-page loading">
        <div className="container">
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-confirmation-page error">
        <div className="container">
          <h2>Commande introuvable</h2>
          <Link to="/boutique" className="btn btn-primary">
            Retour à la boutique
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-confirmation-page">
      <div className="container">
        <div className="confirmation-header">
          <div className="success-icon">
            <FiCheck />
          </div>
          <h1>Commande confirmée !</h1>
          <p className="confirmation-message">
            Merci pour votre commande. Nous avons bien reçu votre demande et nous vous contacterons très prochainement pour finaliser la livraison.
          </p>
          <div className="order-number">
            <span>Numéro de commande:</span>
            <strong>{order.orderNumber}</strong>
          </div>
        </div>

        <div className="confirmation-content">
          {/* Order Details */}
          <div className="confirmation-section">
            <div className="section-card">
              <h2><FiPackage /> Détails de la commande</h2>
              
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      {item.variant && (
                        <p className="variant">{item.variant.name}: {item.variant.value}</p>
                      )}
                      <p className="quantity">Quantité: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      {(item.price * item.quantity).toFixed(2)} DT
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-divider"></div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Sous-total:</span>
                  <span>{order.subtotal.toFixed(2)} DT</span>
                </div>
                <div className="summary-row">
                  <span>Livraison:</span>
                  <span>{order.deliveryFee.toFixed(2)} DT</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>{order.total.toFixed(2)} DT</span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="section-card">
              <h2><FiMail /> Informations de contact</h2>
              
              <div className="info-row">
                <span className="label">Nom:</span>
                <span>{order.customer.firstName} {order.customer.lastName}</span>
              </div>

              <div className="info-row">
                <span className="label">Email:</span>
                <span>{order.customer.email}</span>
              </div>

              <div className="info-row">
                <span className="label">Téléphone:</span>
                <span>{order.customer.phone}</span>
              </div>

              <div className="info-row">
                <span className="label">Livraison:</span>
                <span>
                  {order.deliveryMethod === 'livraison' ? 'À domicile' : 'Remise en main propre'}
                </span>
              </div>

              {order.deliveryMethod === 'livraison' && order.customer.address && (
                <div className="info-row address">
                  <span className="label">Adresse:</span>
                  <span>
                    {order.customer.address.street}<br />
                    {order.customer.address.city}, {order.customer.address.postalCode}
                  </span>
                </div>
              )}

              {order.notes && (
                <div className="info-row notes">
                  <span className="label">Notes:</span>
                  <span>{order.notes}</span>
                </div>
              )}
            </div>
          </div>

          {/* Next Steps */}
          <div className="next-steps-card">
            <h2>Prochaines étapes</h2>
            
            <div className="steps-list">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Confirmation par email</h3>
                  <p>Un email de confirmation a été envoyé à {order.customer.email}</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Nous vous contacterons</h3>
                  <p>Notre équipe vous contactera par téléphone ou WhatsApp pour confirmer votre commande</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Livraison</h3>
                  <p>
                    {order.deliveryMethod === 'livraison' 
                      ? 'Votre commande sera livrée à votre adresse'
                      : 'Nous conviendrons ensemble d\'un lieu de remise'}
                  </p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Paiement</h3>
                  <p>Vous payerez lors de la réception de votre commande</p>
                </div>
              </div>
            </div>

            <div className="contact-buttons">
              <Link to="/contact" className="btn btn-outline">
                <FiMail /> Nous contacter
              </Link>
            </div>

            <div className="actions">
              <Link to="/boutique" className="btn btn-primary">
                Continuer mes achats
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
