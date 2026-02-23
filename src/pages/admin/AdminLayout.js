import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiShoppingBag, FiPackage, FiMail, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('amaya_admin_token');
    if (!token && !location.pathname.includes('/admin/login')) {
      navigate('/admin/login');
    }
  }, [navigate, location]);

  const handleLogout = () => {
    localStorage.removeItem('amaya_admin_token');
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Amaya Admin</h2>
          <button className="sidebar-close" onClick={() => setIsSidebarOpen(false)}>
            <FiX />
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link 
            to="/admin" 
            className={`nav-item ${isActive('/admin') ? 'active' : ''}`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiHome /> Dashboard
          </Link>
          <Link 
            to="/admin/commandes" 
            className={`nav-item ${isActive('/admin/commandes') ? 'active' : ''}`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiShoppingBag /> Commandes
          </Link>
          <Link 
            to="/admin/produits" 
            className={`nav-item ${isActive('/admin/produits') ? 'active' : ''}`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiPackage /> Produits
          </Link>
          <Link 
            to="/admin/newsletter" 
            className={`nav-item ${isActive('/admin/newsletter') ? 'active' : ''}`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiMail /> Newsletter
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <FiLogOut /> Déconnexion
          </button>
          <Link to="/" className="view-site-btn" target="_blank">
            Voir le site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <button className="mobile-menu-toggle" onClick={() => setIsSidebarOpen(true)}>
          <FiMenu />
        </button>
        {children}
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
};

export default AdminLayout;
