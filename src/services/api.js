import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('amaya_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Products
export const getProducts = (params) => api.get('/products', { params });
export const getProduct = (slug) => api.get(`/products/${slug}`);
export const getCollections = () => api.get('/products/collections/list');
export const getCategories = () => api.get('/products/categories/list');
export const searchProducts = (query) => api.get('/products/search/query', { params: { q: query } });

// Orders
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getOrder = (orderNumber) => api.get(`/orders/${orderNumber}`);

// Newsletter
export const subscribeNewsletter = (data) => api.post('/newsletter/subscribe', data);
export const unsubscribeNewsletter = (email) => api.post('/newsletter/unsubscribe', { email });

// Contact
export const sendContactMessage = (data) => api.post('/contact', data);

// Admin
export const adminLogin = (credentials) => api.post('/admin/login', credentials);
export const getAdminStats = () => api.get('/admin/stats');
export const getAdminOrders = (params) => api.get('/admin/orders', { params });
export const updateOrderStatus = (orderId, data) => api.patch(`/admin/orders/${orderId}`, data);
export const getAdminProducts = () => api.get('/admin/products');
export const createProduct = (data) => api.post('/admin/products', data);
export const updateProduct = (productId, data) => api.patch(`/admin/products/${productId}`, data);
export const deleteProduct = (productId) => api.delete(`/admin/products/${productId}`);
export const uploadImage = (formData) => {
  return api.post('/admin/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
export const getNewsletterSubscribers = () => api.get('/admin/newsletter');

export default api;
