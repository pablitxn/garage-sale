import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Story from './components/Story';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import productsData from './data/products.json';
import './App.css';

function App() {
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
        <ProductGrid products={productsData} onProductClick={handleProductClick} />
      </main>
      <Footer />
      {selectedProduct && (
        <ProductDetail product={selectedProduct} onClose={handleCloseDetail} />
      )}
    </div>
  );
}

export default App;

