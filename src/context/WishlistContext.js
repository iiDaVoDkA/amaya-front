import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('amaya_wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('amaya_wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, isLoading]);

  const addToWishlist = (product) => {
    setWishlist(prevWishlist => {
      // Check if product already in wishlist
      if (prevWishlist.some(item => item._id === product._id)) {
        toast.info('Déjà dans vos favoris');
        return prevWishlist;
      }

      toast.success('Ajouté aux favoris ❤️');
      return [...prevWishlist, {
        ...product,
        addedAt: Date.now()
      }];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => 
      prevWishlist.filter(item => item._id !== productId)
    );
    toast.info('Retiré des favoris');
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast.info('Favoris vidés');
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    isLoading
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
