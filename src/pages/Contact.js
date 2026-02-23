import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaEnvelope } from 'react-icons/fa';
import { sendContactMessage } from '../services/api';
import { toast } from 'react-toastify';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Veuillez remplir tous les champs requis');
      return;
    }

    setIsSubmitting(true);
    try {
      await sendContactMessage(formData);
      toast.success('Message envoyé avec succès ! Nous vous répondrons rapidement.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Erreur lors de l\'envoi du message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1>Contactez-nous</h1>
          <p>Nous serions ravis d'échanger avec vous</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-content">
          {/* Contact Info */}
          <div className="contact-info">
            <h2>Parlons ensemble</h2>
            <p className="contact-intro">
              Une question sur nos bijoux ? Besoin d'aide pour passer commande ? 
              Ou simplement envie de discuter ? N'hésitez pas à nous contacter !
            </p>

            <div className="contact-methods">
              <a href="https://www.instagram.com/amaya.officiel_/" target="_blank" rel="noopener noreferrer" className="contact-method">
                <div className="method-icon instagram">
                  <FaInstagram />
                </div>
                <div>
                  <h3>Instagram</h3>
                  <p>Suivez nos actualités et nouveautés</p>
                  <span className="method-link">@amaya.officiel_</span>
                </div>
              </a>

              <a href="https://www.facebook.com/share/1AoLqT94tG/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="contact-method">
                <div className="method-icon facebook">
                  <FaFacebookF />
                </div>
                <div>
                  <h3>Facebook</h3>
                  <p>Rejoignez notre communauté</p>
                  <span className="method-link">Amaya</span>
                </div>
              </a>

              <a href="mailto:order@amaya-boutique.com" className="contact-method">
                <div className="method-icon email">
                  <FaEnvelope />
                </div>
                <div>
                  <h3>Email</h3>
                  <p>Pour toute demande ou commande</p>
                  <span className="method-link">order@amaya-boutique.com</span>
                </div>
              </a>
            </div>

            <div className="hours-info">
              <h3>Horaires de réponse</h3>
              <p>Lundi - Vendredi : 9h00 - 18h00</p>
              <p>Samedi : 10h00 - 16h00</p>
              <p>Dimanche : Fermé</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="form-card">
              <h2>Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label>Nom complet *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-large" disabled={isSubmitting}>
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
