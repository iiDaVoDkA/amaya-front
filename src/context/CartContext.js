import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('amaya_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('amaya_cart', JSON.stringify(cart));
    }
  }, [cart, isLoading]);

  const addToCart = (product, quantity = 1, variant = null) => {
    setCart(prevCart => {
      // Check if product already exists in cart
      const existingItemIndex = prevCart.findIndex(
        item => item._id === product._id && 
        JSON.stringify(item.variant) === JSON.stringify(variant)
      );

      if (existingItemIndex > -1) {
        // Update quantity
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        toast.success('Quantité mise à jour');
        return newCart;
      } else {
        // Add new item
        toast.success('Ajouté au panier ✨');
        return [...prevCart, {
          ...product,
          quantity,
          variant,
          addedAt: Date.now()
        }];
      }
    });
  };

  const removeFromCart = (productId, variant = null) => {
    setCart(prevCart => 
      prevCart.filter(item => 
        !(item._id === productId && JSON.stringify(item.variant) === JSON.stringify(variant))
      )
    );
    toast.info('Produit retiré du panier');
  };

  const updateQuantity = (productId, quantity, variant = null) => {
    if (quantity < 1) {
      removeFromCart(productId, variant);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item._id === productId && JSON.stringify(item.variant) === JSON.stringify(variant)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.info('Panier vidé');
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isLoading
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
