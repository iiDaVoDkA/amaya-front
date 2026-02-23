import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import NewsletterPopup from './components/common/NewsletterPopup';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import About from './pages/About';
import Contact from './pages/Contact';
import Delivery from './pages/Delivery';
import Care from './pages/Care';
import Wishlist from './pages/Wishlist';

// Admin
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminProducts from './pages/admin/AdminProducts';
import AdminNewsletter from './pages/admin/AdminNewsletter';

function App() {
  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <div className="App">
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/boutique" element={<Shop />} />
              <Route path="/produit/:slug" element={<ProductDetail />} />
              <Route path="/panier" element={<Cart />} />
              <Route path="/commander" element={<Checkout />} />
              <Route path="/commande/:orderNumber" element={<OrderConfirmation />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/livraison" element={<Delivery />} />
              <Route path="/entretien" element={<Care />} />
              <Route path="/favoris" element={<Wishlist />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/commandes" element={<AdminOrders />} />
              <Route path="/admin/produits" element={<AdminProducts />} />
              <Route path="/admin/newsletter" element={<AdminNewsletter />} />
            </Routes>
            <Footer />
            <NewsletterPopup />
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
