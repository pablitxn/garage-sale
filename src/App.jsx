import React, { useState } from 'react';
import Header from './components/Header';
import Story from './components/Story';
import Filters from './components/Filters';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import productsData from './data/products.json';
import './App.css';

function App() {
  const [filter, setFilter] = useState('all');

  const filteredProducts = productsData.filter(product => {
    if (filter === 'all') return true;
    return product.status === filter;
  });

  return (
    <div className="app">
      <Header />
      <main>
        <Story />
        <Filters currentFilter={filter} onFilterChange={setFilter} />
        <ProductGrid products={filteredProducts} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
