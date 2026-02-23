import React from 'react';
import { FiDroplet, FiSun, FiShield, FiCheck, FiX } from 'react-icons/fi';
import './Care.css';

const Care = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="care-page">
      <div className="page-hero">
        <div className="container">
          <h1>Entretien des Bijoux</h1>
          <p>Préservez la beauté de vos bijoux Amaya</p>
        </div>
      </div>

      <div className="container">
        <section className="care-intro">
          <p>
            Vos bijoux Amaya sont conçus pour durer. Avec un entretien approprié, 
            ils conserveront leur éclat et leur beauté pendant de nombreuses années. 
            Voici nos conseils pour en prendre soin.
          </p>
        </section>

        <section className="care-section">
          <h2>Conseils d'entretien quotidien</h2>
          
          <div className="care-cards">
            <div className="care-card">
              <div className="care-icon water">
                <FiDroplet />
              </div>
              <h3>Évitez l'eau</h3>
              <p>
                Retirez vos bijoux avant de vous doucher, de nager ou de faire la vaisselle. 
                L'eau et l'humidité peuvent ternir le plaquage or/bronze.
              </p>
            </div>

            <div className="care-card">
              <div className="care-icon sun">
                <FiSun />
              </div>
              <h3>Protégez des produits chimiques</h3>
              <p>
                Parfums, lotions, produits de maquillage et nettoyants peuvent endommager vos bijoux. 
                Appliquez-les avant de porter vos bijoux.
              </p>
            </div>

            <div className="care-card">
              <div className="care-icon shield">
                <FiShield />
              </div>
              <h3>Rangement approprié</h3>
              <p>
                Conservez vos bijoux dans leur pochette d'origine ou dans une boîte à bijoux. 
                Évitez qu'ils ne se touchent entre eux.
              </p>
            </div>
          </div>
        </section>

        <section className="care-section">
          <h2>Nettoyage de vos bijoux</h2>
          
          <div className="cleaning-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Utilisez un chiffon doux</h3>
                <p>Essuyez délicatement vos bijoux avec un chiffon en microfibre propre et sec après chaque utilisation.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Nettoyage en douceur</h3>
                <p>Pour un nettoyage plus profond, utilisez de l'eau tiède savonneuse et une brosse à poils souples. Séchez immédiatement.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Évitez les produits abrasifs</h3>
                <p>N'utilisez jamais de produits chimiques agressifs, de pâtes abrasives ou de brosses dures.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="care-section dos-donts">
          <h2>À faire & À éviter</h2>
          
          <div className="dos-donts-grid">
            <div className="dos">
              <h3><FiCheck /> À faire</h3>
              <ul>
                <li>Mettre vos bijoux en dernier (après maquillage et parfum)</li>
                <li>Les retirer avant le sport ou le sommeil</li>
                <li>Les nettoyer régulièrement avec un chiffon doux</li>
                <li>Les ranger séparément dans leur pochette</li>
                <li>Faire attention aux chocs et aux rayures</li>
                <li>Les sécher immédiatement s'ils sont mouillés</li>
              </ul>
            </div>

            <div className="donts">
              <h3><FiX /> À éviter</h3>
              <ul>
                <li>Porter vos bijoux sous la douche ou à la piscine</li>
                <li>Les exposer à des produits chimiques</li>
                <li>Les laisser en contact avec d'autres bijoux</li>
                <li>Utiliser des produits nettoyants agressifs</li>
                <li>Les laisser dans des endroits humides</li>
                <li>Tirer fort sur les chaînes ou les fermoirs</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="care-section materials">
          <h2>Nos matériaux</h2>
          
          <div className="material-info">
            <h3>Acier inoxydable plaqué or/bronze</h3>
            <p>
              Nos bijoux sont fabriqués en acier inoxydable de haute qualité, plaqués or ou bronze. 
              L'acier inoxydable est hypoallergénique, résistant et durable. Le plaquage offre une 
              finition luxueuse qui, avec un entretien approprié, conservera son éclat pendant longtemps.
            </p>

            <div className="material-properties">
              <div className="property">
                <h4>Hypoallergénique</h4>
                <p>Parfait pour les peaux sensibles</p>
              </div>
              <div className="property">
                <h4>Résistant</h4>
                <p>Ne rouille pas et ne se ternit pas facilement</p>
              </div>
              <div className="property">
                <h4>Durable</h4>
                <p>Conçu pour durer dans le temps</p>
              </div>
            </div>
          </div>
        </section>

        <section className="care-section warranty">
          <div className="warranty-box">
            <h2>Garantie & Service après-vente</h2>
            <p>
              Tous nos bijoux sont garantis contre les défauts de fabrication. 
              Si vous rencontrez un problème avec votre bijou, contactez-nous et 
              nous trouverons une solution adaptée.
            </p>
            <p>
              Pour toute question sur l'entretien de vos bijoux, n'hésitez pas à 
              nous contacter via WhatsApp ou email.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Care;
