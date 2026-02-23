import React, { useState, useEffect } from 'react';
import { FiPhone, FiMail, FiMapPin, FiPackage, FiX, FiDownload } from 'react-icons/fi';
import { getAdminOrders, updateOrderStatus } from '../../services/api';
import { toast } from 'react-toastify';
import AdminLayout from './AdminLayout';
import './AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getAdminOrders();
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Erreur lors du chargement');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, { status: newStatus });
      toast.success('Statut mis à jour');
      fetchOrders();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'nouvelle': return 'status-new';
      case 'en-cours': return 'status-processing';
      case 'livree': return 'status-delivered';
      case 'annulee': return 'status-cancelled';
      default: return '';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'nouvelle': return 'Nouvelle';
      case 'en-cours': return 'En cours';
      case 'livree': return 'Livrée';
      case 'annulee': return 'Annulée';
      default: return status;
    }
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(o => o.status === filterStatus);

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
      <div className="admin-orders-page">
        <div className="admin-header">
          <div>
            <h1>Commandes</h1>
            <p className="admin-subtitle">{filteredOrders.length} commande(s)</p>
          </div>
        </div>

        {/* Status Filters */}
        <div className="status-filters">
          <button
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            Toutes ({orders.length})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'nouvelle' ? 'active' : ''}`}
            onClick={() => setFilterStatus('nouvelle')}
          >
            Nouvelles ({orders.filter(o => o.status === 'nouvelle').length})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'en-cours' ? 'active' : ''}`}
            onClick={() => setFilterStatus('en-cours')}
          >
            En cours ({orders.filter(o => o.status === 'en-cours').length})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'livree' ? 'active' : ''}`}
            onClick={() => setFilterStatus('livree')}
          >
            Livrées ({orders.filter(o => o.status === 'livree').length})
          </button>
        </div>

        {/* Orders List */}
        <div className="orders-list">
          {filteredOrders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-number">
                  <strong>{order.orderNumber}</strong>
                  <span className={`status-badge ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </div>
                <div className="order-date">
                  {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
              </div>

              <div className="order-content">
                <div className="order-customer">
                  <h4>Client</h4>
                  <p><strong>{order.customer.firstName} {order.customer.lastName}</strong></p>
                  <p><FiPhone /> {order.customer.phone}</p>
                  <p><FiMail /> {order.customer.email}</p>
                  {order.deliveryMethod === 'livraison' && order.customer.address && (
                    <p><FiMapPin /> {order.customer.address.street}, {order.customer.address.city}</p>
                  )}
                </div>

                <div className="order-items">
                  <h4>Produits ({order.items.length})</h4>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="order-item">
                      <span>{item.name} x {item.quantity}</span>
                      <span>{(item.price * item.quantity).toFixed(2)} DT</span>
                    </div>
                  ))}
                </div>

                <div className="order-total">
                  <div className="total-row">
                    <span>Sous-total:</span>
                    <span>{order.subtotal.toFixed(2)} DT</span>
                  </div>
                  <div className="total-row">
                    <span>Livraison:</span>
                    <span>{order.deliveryFee.toFixed(2)} DT</span>
                  </div>
                  <div className="total-row final">
                    <span>Total:</span>
                    <span>{order.total.toFixed(2)} DT</span>
                  </div>
                </div>
              </div>

              <div className="order-footer">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="status-select"
                >
                  <option value="nouvelle">Nouvelle</option>
                  <option value="en-cours">En cours</option>
                  <option value="livree">Livrée</option>
                  <option value="annulee">Annulée</option>
                </select>
                <button
                  className="btn btn-outline btn-small"
                  onClick={() => setSelectedOrder(order)}
                >
                  Détails complets
                </button>
              </div>

              {order.notes && (
                <div className="order-notes">
                  <strong>Notes:</strong> {order.notes}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="no-orders-message">
            <FiPackage size={64} />
            <h3>Aucune commande trouvée</h3>
            <p>Les nouvelles commandes apparaîtront ici</p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content order-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Commande {selectedOrder.orderNumber}</h2>
              <button className="modal-close" onClick={() => setSelectedOrder(null)}>
                <FiX />
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-section">
                <h3>Informations client</h3>
                <p><strong>Nom:</strong> {selectedOrder.customer.firstName} {selectedOrder.customer.lastName}</p>
                <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                <p><strong>Téléphone:</strong> {selectedOrder.customer.phone}</p>
                <p><strong>Livraison:</strong> {selectedOrder.deliveryMethod === 'livraison' ? 'À domicile' : 'Remise en main propre'}</p>
                {selectedOrder.deliveryMethod === 'livraison' && selectedOrder.customer.address && (
                  <p><strong>Adresse:</strong> {selectedOrder.customer.address.street}, {selectedOrder.customer.address.city} {selectedOrder.customer.address.postalCode}</p>
                )}
              </div>

              <div className="detail-section">
                <h3>Produits commandés</h3>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="detail-item">
                    <span>{item.name}</span>
                    <span>x {item.quantity}</span>
                    <span>{(item.price * item.quantity).toFixed(2)} DT</span>
                  </div>
                ))}
              </div>

              <div className="detail-section">
                <h3>Montant</h3>
                <div className="detail-item">
                  <span>Sous-total:</span>
                  <span>{selectedOrder.subtotal.toFixed(2)} DT</span>
                </div>
                <div className="detail-item">
                  <span>Livraison:</span>
                  <span>{selectedOrder.deliveryFee.toFixed(2)} DT</span>
                </div>
                <div className="detail-item total">
                  <span><strong>Total:</strong></span>
                  <span><strong>{selectedOrder.total.toFixed(2)} DT</strong></span>
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="detail-section">
                  <h3>Notes</h3>
                  <p>{selectedOrder.notes}</p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedOrder(null)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminOrders;
