import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Story from './components/Story';
import Filters from './components/Filters';
import FilterBar from './components/FilterBar';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import productsData from './data/products.json';
import { CATEGORIES } from './constants';
import './App.css';

function App() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const handlePopState = () => {
      setSelectedProduct((prev) => (prev ? null : prev));
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      window.history.pushState(
        { modal: 'product', productId: selectedProduct.id },
        '',
        window.location.href,
      );
    }
  }, [selectedProduct]);

  const filteredProducts = productsData.filter(product => {
    // Filter by status
    if (statusFilter !== 'all' && product.status !== statusFilter) {
      return false;
    }

    // Filter by category
    if (categoryFilter !== 'All' && product.category !== categoryFilter) {
      return false;
    }

    return true;
  });

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetail = () => {
    if (window.history.state?.modal === 'product') {
      window.history.back();
    } else {
      setSelectedProduct(null);
    }
  };

  return (
    <div className="app">
      <Header />
      <main>
        <Story />
        <section className="controls-section">
          <div className="controls-card">
            <Filters currentFilter={statusFilter} onFilterChange={setStatusFilter} />
            <FilterBar
              categories={CATEGORIES}
              activeCategory={categoryFilter}
              onSelectCategory={setCategoryFilter}
            />
          </div>
        </section>
        <ProductGrid products={filteredProducts} onProductClick={handleProductClick} />
      </main>
      <Footer />
      {selectedProduct && (
        <ProductDetail product={selectedProduct} onClose={handleCloseDetail} />
      )}
    </div>
  );
}

export default App;

