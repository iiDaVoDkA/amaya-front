import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiPackage, FiMail, FiTrendingUp, FiDollarSign } from 'react-icons/fi';
import { getAdminStats } from '../../services/api';
import AdminLayout from './AdminLayout';
import './Admin.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getAdminStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="loading-container">
          <p>Chargement...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-header">
        <h1>Dashboard</h1>
        <p className="admin-subtitle">Vue d'ensemble de votre boutique Amaya</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-card-orders">
          <div className="stat-icon">
            <FiShoppingBag />
          </div>
          <div className="stat-content">
            <h3>Total Commandes</h3>
            <p className="stat-number">{stats?.totalOrders || 0}</p>
            <Link to="/admin/commandes" className="stat-link">Voir tout →</Link>
          </div>
        </div>

        <div className="stat-card stat-card-new">
          <div className="stat-icon">
            <FiTrendingUp />
          </div>
          <div className="stat-content">
            <h3>Nouvelles commandes</h3>
            <p className="stat-number">{stats?.newOrders || 0}</p>
            <span className="stat-badge">À traiter</span>
          </div>
        </div>

        <div className="stat-card stat-card-products">
          <div className="stat-icon">
            <FiPackage />
          </div>
          <div className="stat-content">
            <h3>Produits actifs</h3>
            <p className="stat-number">{stats?.totalProducts || 0}</p>
            <Link to="/admin/produits" className="stat-link">Gérer →</Link>
          </div>
        </div>

        <div className="stat-card stat-card-newsletter">
          <div className="stat-icon">
            <FiMail />
          </div>
          <div className="stat-content">
            <h3>Abonnés newsletter</h3>
            <p className="stat-number">{stats?.newsletterSubscribers || 0}</p>
            <Link to="/admin/newsletter" className="stat-link">Voir →</Link>
          </div>
        </div>

        <div className="stat-card stat-card-revenue">
          <div className="stat-icon">
            <FiDollarSign />
          </div>
          <div className="stat-content">
            <h3>Revenu ce mois</h3>
            <p className="stat-number">{stats?.monthlyRevenue?.toFixed(2) || '0.00'} DT</p>
            <span className="stat-note">Commandes validées</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Produits populaires</h2>
            <Link to="/admin/produits" className="card-link">Voir tout</Link>
          </div>
          <div className="popular-products">
            {stats?.topProducts?.length > 0 ? (
              stats.topProducts.map(product => (
                <div key={product._id} className="popular-product-item">
                  {product.images?.[0]?.url && (
                    <img src={product.images[0].url} alt={product.name} />
                  )}
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p className="product-collection">{product.collection}</p>
                  </div>
                  <div className="product-stats">
                    <span className="sales-badge">{product.orderCount} ventes</span>
                    <span className="views-count">{product.views} vues</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">Aucune donnée disponible</p>
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h2>Actions rapides</h2>
          </div>
          <div className="quick-actions">
            <Link to="/admin/produits?action=new" className="action-button">
              <FiPackage />
              <span>Ajouter un produit</span>
            </Link>
            <Link to="/admin/commandes?status=nouvelle" className="action-button">
              <FiShoppingBag />
              <span>Nouvelles commandes</span>
            </Link>
            <Link to="/admin/newsletter" className="action-button">
              <FiMail />
              <span>Gérer la newsletter</span>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
