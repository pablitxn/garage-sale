import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Story from './components/Story';
import Filters from './components/Filters';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import productsData from './data/products.json';
import { CATEGORIES } from './constants';
import './App.css';

function App() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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
    if (categoryFilter.length > 0 && !categoryFilter.includes(product.category)) {
      return false;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesDescription = product.description.toLowerCase().includes(query);
      const matchesCategory = product.category.toLowerCase().includes(query);

      if (!matchesName && !matchesDescription && !matchesCategory) {
        return false;
      }
    }

    return true;
  });

  const handleToggleCategory = (category) => {
    setCategoryFilter((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    );
  };

  const handleClearCategories = () => {
    setCategoryFilter([]);
  };

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
        <Filters currentFilter={statusFilter} onFilterChange={setStatusFilter} />
        <FilterBar
          categories={CATEGORIES}
          activeCategories={categoryFilter}
          onToggleCategory={handleToggleCategory}
          onClearCategories={handleClearCategories}
        />
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
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

