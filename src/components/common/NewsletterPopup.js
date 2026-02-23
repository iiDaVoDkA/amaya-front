import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { subscribeNewsletter } from '../../services/api';
import { toast } from 'react-toastify';
import './NewsletterPopup.css';

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if popup was already shown
    const popupShown = localStorage.getItem('amaya_newsletter_popup_shown');
    const lastShown = localStorage.getItem('amaya_newsletter_popup_date');
    const today = new Date().toDateString();

    // Show popup after 10 seconds if not shown today
    if (!popupShown || lastShown !== today) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('amaya_newsletter_popup_shown', 'true');
    localStorage.setItem('amaya_newsletter_popup_date', new Date().toDateString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Veuillez entrer votre email');
      return;
    }

    setIsLoading(true);
    try {
      await subscribeNewsletter({ email });
      toast.success('Merci pour votre inscription ! 💌');
      setEmail('');
      handleClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="newsletter-popup-overlay no-print" onClick={handleClose}>
      <div className="newsletter-popup" onClick={(e) => e.stopPropagation()}>
        <button className="newsletter-popup-close" onClick={handleClose}>
          <FiX />
        </button>

        <div className="newsletter-popup-content">
          <h2>Rejoignez l'univers Amaya</h2>
          <p>Recevez nos nouveautés exclusives et profitez d'avantages réservés à nos abonnés.</p>

          <form onSubmit={handleSubmit} className="newsletter-popup-form">
            <input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Inscription...' : 'S\'inscrire'}
            </button>
          </form>

          <p className="newsletter-popup-disclaimer">
            Nous respectons votre vie privée. Désinscription possible à tout moment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
