import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaEnvelope, FaHeart } from 'react-icons/fa';
import { FiCreditCard, FiTruck } from 'react-icons/fi';
import { subscribeNewsletter } from '../../services/api';
import { toast } from 'react-toastify';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
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
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content container">
        {/* Brand Section */}
        <div className="footer-section">
          <h3 className="footer-logo">Amaya</h3>
          <p className="footer-tagline">
            Bijoux minimalistes et émotionnels, pensés pour raconter des histoires d'amour, 
            de liberté et d'affirmation de soi.
          </p>
          <div className="footer-social">
            <a 
              href="https://www.instagram.com/amaya.officiel_/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://www.facebook.com/share/1AoLqT94tG/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a 
              href="mailto:order@amaya-boutique.com"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Navigation</h4>
          <ul className="footer-links">
            <li><Link to="/boutique">Boutique</Link></li>
            <li><Link to="/a-propos">À Propos</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/livraison">Livraison & Retours</Link></li>
            <li><Link to="/entretien">Entretien des Bijoux</Link></li>
          </ul>
        </div>

        {/* Collections */}
        <div className="footer-section">
          <h4>Collections</h4>
          <ul className="footer-links">
            <li><Link to="/boutique?collection=You Are Mine">You Are Mine</Link></li>
            <li><Link to="/boutique?collection=Née de la Terre">Née de la Terre</Link></li>
            <li><Link to="/favoris">Mes Favoris</Link></li>
            <li><Link to="/panier">Mon Panier</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h4>Newsletter</h4>
          <p className="footer-newsletter-text">
            Recevez nos nouveautés et collections exclusives.
          </p>
          <form className="footer-newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input 
              type="email" 
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Envoi...' : 'S\'inscrire'}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Amaya. Tous droits réservés. 
            Fait avec <FaHeart className="heart-icon" /> en Tunisie.
          </p>
          <div className="footer-payment">
            <span>Paiement à la livraison disponible</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
