import React from 'react';
import { FiTruck, FiClock, FiMapPin, FiRefreshCw } from 'react-icons/fi';
import './Delivery.css';

const Delivery = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="delivery-page">
      <div className="page-hero">
        <div className="container">
          <h1>Livraison & Retours</h1>
          <p>Toutes les informations sur nos modes de livraison</p>
        </div>
      </div>

      <div className="container">
        {/* Delivery Methods */}
        <section className="info-section">
          <h2><FiTruck /> Modes de livraison</h2>
          
          <div className="delivery-cards">
            <div className="delivery-card">
              <div className="card-icon">
                <FiTruck />
              </div>
              <h3>Livraison à domicile</h3>
              <div className="price-tag">7 DT</div>
              <ul>
                <li>Livraison partout en Tunisie</li>
                <li>Délai de 2 à 5 jours ouvrables</li>
                <li>Paiement à la livraison disponible</li>
                <li>Tracking de votre commande</li>
              </ul>
            </div>

            <div className="delivery-card featured">
              <div className="featured-badge">Recommandé</div>
              <div className="card-icon">
                <FiMapPin />
              </div>
              <h3>Remise en main propre</h3>
              <div className="price-tag free">Gratuit</div>
              <ul>
                <li>Rencontre convenue ensemble</li>
                <li>Pas de frais de livraison</li>
                <li>Paiement en espèces ou mobile</li>
                <li>Essayage possible avant achat</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Delivery Time */}
        <section className="info-section">
          <h2><FiClock /> Délais de livraison</h2>
          
          <div className="timeline-info">
            <div className="timeline-item">
              <div className="timeline-number">1</div>
              <div className="timeline-content">
                <h3>Confirmation de commande</h3>
                <p>Nous vous contactons dans les 24h pour confirmer votre commande et les détails de livraison</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-number">2</div>
              <div className="timeline-content">
                <h3>Préparation</h3>
                <p>Votre commande est soigneusement préparée et emballée (1-2 jours ouvrables)</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-number">3</div>
              <div className="timeline-content">
                <h3>Expédition</h3>
                <p>Votre colis est confié au transporteur (notification par SMS/WhatsApp)</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-number">4</div>
              <div className="timeline-content">
                <h3>Livraison</h3>
                <p>Réception de votre commande (2-5 jours selon la région)</p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <p><strong>Note:</strong> Les délais peuvent varier selon votre région et la disponibilité des produits. Nous vous tiendrons informé(e) à chaque étape.</p>
          </div>
        </section>

        {/* Return Policy */}
        <section className="info-section">
          <h2><FiRefreshCw /> Politique de retour</h2>
          
          <div className="policy-content">
            <div className="policy-card">
              <h3>Conditions de retour</h3>
              <ul>
                <li>Retour accepté dans les <strong>7 jours</strong> suivant la réception</li>
                <li>Le bijou doit être dans son état d'origine, non porté et avec son emballage</li>
                <li>Aucune trace d'usure ou de modification</li>
                <li>Étiquettes et certificats d'authenticité intacts</li>
              </ul>
            </div>

            <div className="policy-card">
              <h3>Comment effectuer un retour ?</h3>
              <ol>
                <li>Contactez-nous via WhatsApp ou email en indiquant votre numéro de commande</li>
                <li>Expliquez la raison du retour</li>
                <li>Nous vous donnerons les instructions pour retourner le produit</li>
                <li>Une fois le produit reçu et vérifié, nous procédons au remboursement</li>
              </ol>
            </div>

            <div className="policy-card">
              <h3>Remboursement</h3>
              <p>Le remboursement est effectué selon le mode de paiement initial :</p>
              <ul>
                <li><strong>Paiement cash :</strong> remboursement en espèces ou virement bancaire</li>
                <li><strong>Paiement mobile :</strong> remboursement sur le même compte</li>
                <li>Délai de remboursement : 5 à 10 jours ouvrables</li>
              </ul>
            </div>
          </div>

          <div className="info-box warning">
            <p><strong>Important:</strong> Les frais de retour sont à la charge du client, sauf en cas de produit défectueux ou d'erreur de notre part.</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="info-section faq-section">
          <h2>Questions fréquentes</h2>
          
          <div className="faq-list">
            <div className="faq-item">
              <h4>Puis-je suivre ma commande ?</h4>
              <p>Oui, nous vous envoyons un numéro de suivi dès l'expédition de votre commande. Vous pouvez nous contacter à tout moment pour connaître l'état de votre livraison.</p>
            </div>

            <div className="faq-item">
              <h4>Que faire si je ne suis pas disponible lors de la livraison ?</h4>
              <p>Le livreur vous contactera avant de passer. Si vous n'êtes pas disponible, vous pouvez convenir d'un autre créneau ou demander une remise à un proche.</p>
            </div>

            <div className="faq-item">
              <h4>Livrez-vous à l'international ?</h4>
              <p>Actuellement, nous livrons uniquement en Tunisie. Pour les commandes internationales, veuillez nous contacter directement.</p>
            </div>

            <div className="faq-item">
              <h4>Les bijoux sont-ils garantis ?</h4>
              <p>Oui, tous nos bijoux sont garantis contre les défauts de fabrication. En cas de problème, contactez-nous et nous trouverons une solution.</p>
            </div>

            <div className="faq-item">
              <h4>Puis-je modifier ma commande après validation ?</h4>
              <p>Oui, si votre commande n'a pas encore été expédiée. Contactez-nous rapidement via WhatsApp pour toute modification.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Delivery;
