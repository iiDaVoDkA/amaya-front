import React, { useState, useEffect, useCallback } from 'react';
import { FiPlus, FiEdit2, FiImage, FiEye, FiEyeOff, FiSave, FiX, FiUpload, FiChevronUp, FiChevronDown, FiStar, FiPackage } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { getAdminProducts, updateProduct, createProduct, uploadImage } from '../../services/api';
import { toast } from 'react-toastify';
import AdminLayout from './AdminLayout';
import './AdminProducts.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProducts = useCallback(() => {
    if (selectedCollection === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.collection === selectedCollection));
    }
  }, [selectedCollection, products]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  const fetchProducts = async () => {
    try {
      const response = await getAdminProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Erreur lors du chargement des produits');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct({ ...product });
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingProduct({
      name: '',
      slug: '',
      collection: 'Née de la Terre',
      shortDescription: '',
      description: '',
      price: 0,
      priceWithDelivery: 0,
      deliveryPrice: 7,
      category: 'Bague',
      material: 'Acier inoxydable doré',
      images: [],
      details: {
        adjustable: false,
        size: '',
        care: 'Éviter le contact avec l\'eau et les parfums. Nettoyer délicatement avec un chiffon doux.'
      },
      variants: [],
      isFeatured: false,
      isActive: true,
      stock: 100
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      // Generate slug if creating new product
      if (!editingProduct._id && !editingProduct.slug) {
        editingProduct.slug = editingProduct.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }

      // Calculate priceWithDelivery
      editingProduct.priceWithDelivery = editingProduct.price + editingProduct.deliveryPrice;

      if (editingProduct._id) {
        await updateProduct(editingProduct._id, editingProduct);
        toast.success('Produit mis à jour');
      } else {
        await createProduct(editingProduct);
        toast.success('Produit créé');
      }
      
      setIsModalOpen(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const handleToggleActive = async (product) => {
    try {
      await updateProduct(product._id, { isActive: !product.isActive });
      toast.success(product.isActive ? 'Produit désactivé' : 'Produit activé');
      fetchProducts();
    } catch (error) {
      toast.error('Erreur lors de la modification');
    }
  };

  const handleToggleFeatured = async (product) => {
    try {
      await updateProduct(product._id, { isFeatured: !product.isFeatured });
      toast.success(product.isFeatured ? 'Retiré des favoris' : 'Ajouté aux favoris');
      fetchProducts();
    } catch (error) {
      toast.error('Erreur lors de la modification');
    }
  };

  const handleMoveProduct = async (productId, direction) => {
    const currentIndex = filteredProducts.findIndex(p => p._id === productId);
    if (currentIndex === -1) return;

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= filteredProducts.length) return;

    try {
      const currentProduct = filteredProducts[currentIndex];
      const targetProduct = filteredProducts[targetIndex];

      // Swap display orders
      await updateProduct(currentProduct._id, { displayOrder: targetProduct.displayOrder || targetIndex });
      await updateProduct(targetProduct._id, { displayOrder: currentProduct.displayOrder || currentIndex });

      toast.success('Ordre modifié');
      fetchProducts();
    } catch (error) {
      toast.error('Erreur lors du changement d\'ordre');
    }
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    try {
      const uploadedUrls = [];
      
      for (let file of files) {
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await uploadImage(formData);
        uploadedUrls.push({
          url: response.data.imageUrl,
          alt: editingProduct.name
        });
      }

      setEditingProduct({
        ...editingProduct,
        images: [...editingProduct.images, ...uploadedUrls]
      });
      
      toast.success(`${files.length} image(s) ajoutée(s)`);
    } catch (error) {
      toast.error('Erreur lors de l\'upload');
    } finally {
      setUploadingImages(false);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...editingProduct.images];
    newImages.splice(index, 1);
    setEditingProduct({ ...editingProduct, images: newImages });
  };

  const collections = ['Née de la Terre', 'You Are Mine'];

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
      <div className="admin-products-page">
        <div className="admin-header">
          <div>
            <h1>Gestion des Produits</h1>
            <p className="admin-subtitle">{filteredProducts.length} produit(s) affiché(s)</p>
          </div>
          <button className="btn btn-primary" onClick={handleCreate}>
            <FiPlus /> Ajouter un produit
          </button>
        </div>

        {/* Collection Filters */}
        <div className="collection-filters">
          <button
            className={`filter-btn ${selectedCollection === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCollection('all')}
          >
            Tous ({products.length})
          </button>
          {collections.map(collection => (
            <button
              key={collection}
              className={`filter-btn ${selectedCollection === collection ? 'active' : ''}`}
              onClick={() => setSelectedCollection(collection)}
            >
              {collection} ({products.filter(p => p.collection === collection).length})
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="products-admin-grid">
          {filteredProducts.map(product => (
            <div key={product._id} className={`product-admin-card ${!product.isActive ? 'inactive' : ''}`}>
              <div className="product-image-container">
                {product.images?.[0]?.url ? (
                  <img src={product.images[0].url} alt={product.name} />
                ) : (
                  <div className="no-image">
                    <FiImage />
                    <span>Aucune image</span>
                  </div>
                )}
                <div className="product-badges">
                  {product.isFeatured && <span className="badge badge-featured">Populaire</span>}
                  {!product.isActive && <span className="badge badge-inactive">Inactif</span>}
                </div>
              </div>

              <div className="product-admin-info">
                <h3>{product.name}</h3>
                <p className="product-collection">{product.collection}</p>
                <p className="product-price">{product.price} DT</p>
                <div className="product-meta">
                  <span>{product.orderCount} ventes</span>
                  <span>{product.views} vues</span>
                  <span>{product.stock} en stock</span>
                </div>
              </div>

              <div className="product-actions">
                <button
                  className="action-btn move"
                  onClick={() => handleMoveProduct(product._id, 'up')}
                  title="Monter"
                  disabled={filteredProducts.indexOf(product) === 0}
                >
                  <FiChevronUp />
                </button>
                <button
                  className="action-btn move"
                  onClick={() => handleMoveProduct(product._id, 'down')}
                  title="Descendre"
                  disabled={filteredProducts.indexOf(product) === filteredProducts.length - 1}
                >
                  <FiChevronDown />
                </button>
                <button
                  className="action-btn featured"
                  onClick={() => handleToggleFeatured(product)}
                  title={product.isFeatured ? 'Retirer des favoris' : 'Mettre en avant'}
                >
                  {product.isFeatured ? <FaStar /> : <FiStar />}
                </button>
                <button
                  className="action-btn edit"
                  onClick={() => handleEdit(product)}
                  title="Modifier"
                >
                  <FiEdit2 />
                </button>
                <button
                  className={`action-btn ${product.isActive ? 'hide' : 'show'}`}
                  onClick={() => handleToggleActive(product)}
                  title={product.isActive ? 'Désactiver' : 'Activer'}
                >
                  {product.isActive ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products-message">
            <FiPackage size={64} />
            <h3>Aucun produit trouvé</h3>
            <p>Commencez par ajouter votre premier produit</p>
            <button className="btn btn-primary" onClick={handleCreate}>
              <FiPlus /> Ajouter un produit
            </button>
          </div>
        )}
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && editingProduct && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingProduct._id ? 'Modifier le produit' : 'Nouveau produit'}</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Nom du produit *</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                    placeholder="Ex: Bracelet Ligne d'Or"
                  />
                </div>

                <div className="form-group">
                  <label>Collection *</label>
                  <select
                    value={editingProduct.collection}
                    onChange={(e) => setEditingProduct({...editingProduct, collection: e.target.value})}
                  >
                    <option value="Née de la Terre">Née de la Terre</option>
                    <option value="You Are Mine">You Are Mine</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Catégorie *</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                  >
                    <option value="Bague">Bague</option>
                    <option value="Bracelet">Bracelet</option>
                    <option value="Collier">Collier</option>
                    <option value="Boucles d'oreilles">Boucles d'oreilles</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Prix (DT) *</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                    step="0.01"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Frais de livraison (DT)</label>
                  <input
                    type="number"
                    value={editingProduct.deliveryPrice}
                    onChange={(e) => setEditingProduct({...editingProduct, deliveryPrice: parseFloat(e.target.value)})}
                    step="0.01"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Stock</label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})}
                    min="0"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Description courte *</label>
                  <input
                    type="text"
                    value={editingProduct.shortDescription}
                    onChange={(e) => setEditingProduct({...editingProduct, shortDescription: e.target.value})}
                    placeholder="Description émotionnelle courte"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Description complète *</label>
                  <textarea
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                    rows="4"
                    placeholder="Description détaillée du produit"
                  />
                </div>

                <div className="form-group">
                  <label>Matériau</label>
                  <input
                    type="text"
                    value={editingProduct.material}
                    onChange={(e) => setEditingProduct({...editingProduct, material: e.target.value})}
                    placeholder="Ex: Acier inoxydable doré"
                  />
                </div>

                <div className="form-group">
                  <label>Taille</label>
                  <input
                    type="text"
                    value={editingProduct.details?.size || ''}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      details: {...editingProduct.details, size: e.target.value}
                    })}
                    placeholder="Ex: Ajustable 52-58"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Instructions d'entretien</label>
                  <textarea
                    value={editingProduct.details?.care || ''}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      details: {...editingProduct.details, care: e.target.value}
                    })}
                    rows="2"
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={editingProduct.details?.adjustable || false}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        details: {...editingProduct.details, adjustable: e.target.checked}
                      })}
                    />
                    <span>Produit ajustable</span>
                  </label>
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={editingProduct.isFeatured || false}
                      onChange={(e) => setEditingProduct({...editingProduct, isFeatured: e.target.checked})}
                    />
                    <span>Produit populaire (homepage)</span>
                  </label>
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={editingProduct.isActive}
                      onChange={(e) => setEditingProduct({...editingProduct, isActive: e.target.checked})}
                    />
                    <span>Produit actif (visible sur le site)</span>
                  </label>
                </div>

                {/* Images Section */}
                <div className="form-group full-width">
                  <label>Images du produit</label>
                  <div className="images-manager">
                    <div className="images-grid">
                      {editingProduct.images?.map((image, index) => (
                        <div key={index} className="image-item">
                          <img src={image.url} alt={image.alt} />
                          <button
                            className="remove-image-btn"
                            onClick={() => handleRemoveImage(index)}
                            title="Supprimer"
                          >
                            <FiX />
                          </button>
                          <span className="image-order">{index + 1}</span>
                        </div>
                      ))}
                      
                      <label className="upload-image-btn">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                          disabled={uploadingImages}
                        />
                        <FiUpload />
                        <span>{uploadingImages ? 'Upload...' : 'Ajouter'}</span>
                      </label>
                    </div>
                    <p className="help-text">
                      Ajoutez jusqu'à 5 images. La première sera l'image principale.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                Annuler
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                <FiSave /> Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProducts;
