import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const phoneNumber = '+216XXXXXXXX'; // Replace with actual number
  const message = 'Bonjour Amaya, je souhaite en savoir plus sur vos bijoux.';
  
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button 
      className="whatsapp-button no-print" 
      onClick={handleClick}
      aria-label="Contacter sur WhatsApp"
    >
      <FaWhatsapp />
      <span className="whatsapp-tooltip">Contactez-nous</span>
    </button>
  );
};

export default WhatsAppButton;
