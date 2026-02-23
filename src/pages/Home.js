import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiTruck, FiHeart, FiGift } from 'react-icons/fi';
import { getProducts } from '../services/api';
import ProductCard from '../components/products/ProductCard';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await getProducts({ featured: 'true' });
      setFeaturedProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section - Image first (photo sur fond sans rien), then text */}
      <section className="hero-section">
        <div className="hero-image-block">
          <img
            src="/images/about-preview.jpg"
            alt="Amaya Bijoux"
          />
        </div>
        <div className="hero-content container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <h1 className="hero-title">
              Amaya
              <span className="hero-subtitle">Bijoux Élégants & Émotionnels</span>
            </h1>
            <p className="hero-description">
              Des créations minimalistes inspirées par la nature, pensées pour raconter 
              des histoires d'amour, de liberté et d'affirmation de soi.
            </p>
            <div className="hero-buttons">
              <Link to="/boutique" className="btn btn-primary">
                Découvrir la Collection
              </Link>
              <Link to="/a-propos" className="btn btn-secondary">
                Notre Histoire
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="collections-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2>Nos Collections</h2>
            <p>Chaque collection raconte une histoire unique</p>
          </motion.div>

          <div className="collections-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="collection-card"
            >
              <Link to="/boutique?collection=You Are Mine">
                <div className="collection-image">
                  <img src="/images/collections/you-are-mine.jpg" alt="You Are Mine" />
                </div>
                <div className="collection-info">
                  <h3>You Are Mine</h3>
                  <p>Bijoux qui célèbrent l'amour, le lien et l'appartenance mutuelle</p>
                  <span className="collection-link">Découvrir →</span>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="collection-card"
            >
              <Link to="/boutique?collection=Née de la Terre">
                <div className="collection-image">
                  <img src="/images/collections/nee-de-la-terre.jpg" alt="Née de la Terre" />
                </div>
                <div className="collection-info">
                  <h3>Née de la Terre</h3>
                  <p>Inspirée par la nature, les formes organiques et les teintes douces</p>
                  <span className="collection-link">Découvrir →</span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2>Pièces Favorites</h2>
            <p>Nos créations les plus appréciées</p>
          </motion.div>

          {isLoading ? (
            <div className="products-grid">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="product-skeleton">
                  <div className="skeleton skeleton-image"></div>
                  <div className="skeleton skeleton-text"></div>
                  <div className="skeleton skeleton-text short"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="products-grid">
              {featuredProducts.slice(0, 4).map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}

          <div className="section-cta">
            <Link to="/boutique" className="btn btn-outline">
              Voir Tous les Produits
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="about-preview">
        <div className="container">
          <div className="about-preview-content">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="about-preview-text"
            >
              <h2>L'histoire d'Amaya</h2>
              <p>
                Amaya est née d'une passion pour la beauté minimaliste et l'émotion authentique. 
                Chaque bijou est pensé pour raconter une histoire, celle de celle qui le porte.
              </p>
              <p>
                Inspirés par la nature, nos créations privilégient la sobriété, le sens et un 
                rendu raffiné. Des pièces intemporelles qui se portent au quotidien, comme un 
                message intime ou un geste fort.
              </p>
              <Link to="/a-propos" className="btn btn-text">
                En savoir plus →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="about-preview-image"
            >
              <img src="/images/about-preview.jpg" alt="Amaya" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="trust-item"
            >
              <div className="trust-icon"><FiStar /></div>
              <h3>Qualité Premium</h3>
              <p>Acier inoxydable doré, résistant et hypoallergénique</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="trust-item"
            >
              <div className="trust-icon"><FiTruck /></div>
              <h3>Livraison Rapide</h3>
              <p>Partout en Tunisie, ou remise en main propre</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="trust-item"
            >
              <div className="trust-icon"><FiHeart /></div>
              <h3>Création Unique</h3>
              <p>Chaque bijou raconte une histoire authentique</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="trust-item"
            >
              <div className="trust-icon"><FiGift /></div>
              <h3>Emballage Soigné</h3>
              <p>Prêt à offrir avec amour</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
