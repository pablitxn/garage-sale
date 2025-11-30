import React, { useState } from 'react';
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
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = productsData.filter(product => {
    // Filter by status
    if (statusFilter !== 'all' && product.status !== statusFilter) {
      return false;
    }

    // Filter by category
    if (categoryFilter !== 'All' && product.category !== categoryFilter) {
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

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="app">
      <Header />
      <main>
        <Story />
        <Filters currentFilter={statusFilter} onFilterChange={setStatusFilter} />
        <FilterBar
          categories={CATEGORIES}
          activeCategory={categoryFilter}
          onSelectCategory={setCategoryFilter}
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

