import React from 'react';
import { Link } from 'react-router-dom';
import { FiZap, FiHeart, FiFeather, FiAward } from 'react-icons/fi';
import './About.css';

const About = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1>L'Histoire d'Amaya</h1>
          <p className="subtitle">Bijoux minimalistes et émotionnels</p>
        </div>
      </div>

      <div className="container">
        <section className="about-section about-name-section">
          <div className="section-content">
            <h2>Pourquoi « Amaya » ?</h2>
            <p>
              <strong>Amaya</strong> est un prénom aux résonances multiples. En japonais, il évoque 
              la « pluie de nuit » — douceur et mystère. Ailleurs, il porte l'idée de rareté et de 
              singularité. Nous avons choisi ce nom pour une marque de bijoux qui se veut à la fois 
              douce, forte et unique : comme les histoires que chaque pièce est faite pour raconter.
            </p>
          </div>
        </section>

        <section className="about-section">
          <div className="section-content">
            <h2>Notre Vision</h2>
            <p>
              Amaya est née d'une passion pour la beauté minimaliste et l'émotion authentique. 
              Nous croyons que les bijoux ne sont pas de simples accessoires, mais des messages 
              intimes, des gestes forts, des histoires personnelles que l'on porte sur soi.
            </p>
            <p>
              Chaque création Amaya est pensée pour raconter une histoire – celle de celle qui 
              la porte, qu'elle soit une histoire d'amour, de liberté, ou d'affirmation de soi.
            </p>
          </div>
        </section>

        <section className="about-section values-section">
          <h2>Nos Valeurs</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon"><FiZap /></div>
              <h3>Minimalisme</h3>
              <p>
                Des designs épurés qui privilégient l'essentiel. Sobriété et élégance 
                pour des pièces intemporelles.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon"><FiHeart /></div>
              <h3>Émotion</h3>
              <p>
                Chaque bijou porte un sens, une intention. Créer des moments, 
                raconter des histoires, célébrer des liens.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon"><FiFeather /></div>
              <h3>Nature</h3>
              <p>
                Inspirée par les formes organiques, les teintes douces (beige, doré, bronze) 
                et la beauté naturelle.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon"><FiAward /></div>
              <h3>Affirmation</h3>
              <p>
                Pour la femme moderne, indépendante et sensible. Des bijoux qui 
                célèbrent la force et la douceur.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section collections-section">
          <h2>Nos Collections</h2>
          
          <div className="collection-showcase">
            <div className="collection-text">
              <h3>You Are Mine</h3>
              <p>
                Une collection qui célèbre l'amour, le lien et l'appartenance mutuelle. 
                Cœurs épurés, anneaux complémentaires, bracelets délicats... Chaque pièce 
                exprime un lien : entre deux personnes, ou avec soi-même.
              </p>
              <p className="collection-message">
                "Je suis à toi" – un message d'amour intemporel
              </p>
              <Link to="/boutique?collection=You Are Mine" className="btn btn-outline">
                Découvrir la collection
              </Link>
            </div>
          </div>

          <div className="collection-showcase reverse">
            <div className="collection-text">
              <h3>Née de la Terre</h3>
              <p>
                Inspirée par la nature, cette collection capture l'essence des formes organiques 
                et des teintes douces. Bronze, beige, or... Des couleurs qui évoquent la terre, 
                le calme et le soleil.
              </p>
              <p className="collection-message">
                Des bijoux qui racontent l'histoire de la nature
              </p>
              <Link to="/boutique?collection=Née de la Terre" className="btn btn-outline">
                Découvrir la collection
              </Link>
            </div>
          </div>
        </section>

        <section className="about-section quality-section">
          <h2>Qualité & Fabrication</h2>
          <div className="quality-content">
            <div className="quality-item">
              <h3>Matériaux Nobles</h3>
              <p>
                Nos bijoux sont fabriqués en acier inoxydable plaqué or ou bronze, 
                garantissant durabilité et résistance. Hypoallergéniques, ils conviennent 
                à toutes les peaux sensibles.
              </p>
            </div>

            <div className="quality-item">
              <h3>Fabrication Soignée</h3>
              <p>
                Chaque pièce est sélectionnée avec attention pour garantir une qualité 
                optimale. Un soin particulier est apporté aux finitions pour un rendu 
                raffiné et élégant.
              </p>
            </div>

            <div className="quality-item">
              <h3>Emballage Précieux</h3>
              <p>
                Vos bijoux arrivent dans un emballage soigné, prêt à offrir avec amour. 
                Parce que chaque détail compte dans l'expérience Amaya.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section cta-section">
          <div className="cta-content">
            <h2>Rejoignez l'univers Amaya</h2>
            <p>
              Découvrez nos créations et trouvez le bijou qui racontera votre histoire.
            </p>
            <div className="cta-buttons">
              <Link to="/boutique" className="btn btn-primary">
                Découvrir la Boutique
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Nous Contacter
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
