import React, { useState, useEffect } from 'react';
import { FiMail, FiDownload, FiUsers } from 'react-icons/fi';
import { getNewsletterSubscribers } from '../../services/api';
import { toast } from 'react-toastify';
import AdminLayout from './AdminLayout';
import './Admin.css';

const AdminNewsletter = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await getNewsletterSubscribers();
      setSubscribers(response.data);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      toast.error('Erreur lors du chargement');
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Email', 'Prénom', 'Date d\'inscription'],
      ...subscribers.map(sub => [
        sub.email,
        sub.firstName || '',
        new Date(sub.createdAt).toLocaleDateString('fr-FR')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-amaya-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Export réussi');
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
      <div className="admin-newsletter-page">
        <div className="admin-header">
          <div>
            <h1>Newsletter</h1>
            <p className="admin-subtitle">{subscribers.length} abonné(s)</p>
          </div>
          <button className="btn btn-primary" onClick={exportToCSV}>
            <FiDownload /> Exporter en CSV
          </button>
        </div>

        <div className="newsletter-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <FiUsers />
            </div>
            <div className="stat-content">
              <h3>Total abonnés</h3>
              <p className="stat-number">{subscribers.length}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FiMail />
            </div>
            <div className="stat-content">
              <h3>Ce mois</h3>
              <p className="stat-number">
                {subscribers.filter(s => {
                  const subDate = new Date(s.createdAt);
                  const now = new Date();
                  return subDate.getMonth() === now.getMonth() && 
                         subDate.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
          </div>
        </div>

        <div className="subscribers-table">
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Prénom</th>
                <th>Date d'inscription</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map(subscriber => (
                <tr key={subscriber._id}>
                  <td>{subscriber.email}</td>
                  <td>{subscriber.firstName || '-'}</td>
                  <td>
                    {new Date(subscriber.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </td>
                  <td>
                    <span className="source-badge">{subscriber.source || 'website'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {subscribers.length === 0 && (
            <div className="no-data-message">
              <p>Aucun abonné pour le moment</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNewsletter;
