import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCollections, getCategories } from '../services/api';
import ProductCard from '../components/products/ProductCard';
import './Shop.css';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    collection: searchParams.get('collection') || '',
    category: searchParams.get('category') || '',
    sort: searchParams.get('sort') || 'newest'
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCollections();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const params = {};
      if (filters.collection) params.collection = filters.collection;
      if (filters.category) params.category = filters.category;
      if (filters.sort) params.sort = filters.sort;

      const response = await getProducts(params);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCollections = async () => {
    try {
      const response = await getCollections();
      setCollections(response.data);
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Update URL params
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach(k => {
      if (newFilters[k]) params.set(k, newFilters[k]);
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({ collection: '', category: '', sort: 'newest' });
    setSearchParams({});
  };

  return (
    <div className="shop-page">
      <div className="shop-header">
        <div className="container">
          <h1>Notre Boutique</h1>
          <p>Découvrez nos créations minimalistes et élégantes</p>
        </div>
      </div>

      <div className="shop-content container">
        {/* Mobile Filter Toggle */}
        <button 
          className="mobile-filter-toggle"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          {isMobileFilterOpen ? 'Fermer les filtres' : 'Filtres'}
        </button>

        {/* Filters Sidebar */}
        <aside className={`shop-filters ${isMobileFilterOpen ? 'mobile-open' : ''}`}>
          <div className="filter-header">
            <h3>Filtres</h3>
            {(filters.collection || filters.category) && (
              <button onClick={clearFilters} className="clear-filters">
                Effacer tout
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="filter-group">
            <h4>Trier par</h4>
            <div className="filter-options">
              <label className="radio-option">
                <input
                  type="radio"
                  name="sort"
                  value="newest"
                  checked={filters.sort === 'newest'}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                />
                <span>Nouveautés</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="sort"
                  value="popular"
                  checked={filters.sort === 'popular'}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                />
                <span>Populaires</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="sort"
                  value="price-asc"
                  checked={filters.sort === 'price-asc'}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                />
                <span>Prix croissant</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="sort"
                  value="price-desc"
                  checked={filters.sort === 'price-desc'}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                />
                <span>Prix décroissant</span>
              </label>
            </div>
          </div>

          {/* Collections */}
          <div className="filter-group">
            <h4>Collection</h4>
            <div className="filter-options">
              <label className="radio-option">
                <input
                  type="radio"
                  name="collection"
                  value=""
                  checked={filters.collection === ''}
                  onChange={(e) => handleFilterChange('collection', e.target.value)}
                />
                <span>Toutes</span>
              </label>
              {collections.map(collection => (
                <label key={collection} className="radio-option">
                  <input
                    type="radio"
                    name="collection"
                    value={collection}
                    checked={filters.collection === collection}
                    onChange={(e) => handleFilterChange('collection', e.target.value)}
                  />
                  <span>{collection}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="filter-group">
            <h4>Type de bijou</h4>
            <div className="filter-options">
              <label className="radio-option">
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={filters.category === ''}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                />
                <span>Tous</span>
              </label>
              {categories.map(category => (
                <label key={category} className="radio-option">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={filters.category === category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="shop-products">
          <div className="products-header">
            <p className="products-count">
              {isLoading ? 'Chargement...' : `${products.length} produit${products.length > 1 ? 's' : ''}`}
            </p>
          </div>

          {isLoading ? (
            <div className="products-grid">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="product-skeleton">
                  <div className="skeleton skeleton-image"></div>
                  <div className="skeleton skeleton-text"></div>
                  <div className="skeleton skeleton-text short"></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="no-products">
              <p>Aucun produit trouvé avec ces filtres.</p>
              <button onClick={clearFilters} className="btn btn-outline">
                Voir tous les produits
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
