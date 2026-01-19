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

  // Detectar hash al cargar y abrir el producto correspondiente
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remover el #
    if (hash) {
      const product = productsData.find((p) => p.slug === hash);
      if (product) {
        setSelectedProduct(product);
      }
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const product = productsData.find((p) => p.slug === hash);
        setSelectedProduct(product || null);
      } else {
        setSelectedProduct(null);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    window.history.pushState(
      { modal: 'product', slug: product.slug },
      '',
      `#${product.slug}`,
    );
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
    window.history.pushState(null, '', window.location.pathname);
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

