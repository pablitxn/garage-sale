import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products, onProductClick }) => {
    return (
        <div className="product-grid-container">
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => onProductClick(product)}
                    />
                ))}
            </div>
            {products.length === 0 && (
                <div className="no-results">
                    <p>No se encontraron productos con esos filtros 😔</p>
                    <p className="no-results-hint">Probá con otros filtros o búsqueda</p>
                </div>
            )}
        </div>
    );
};

export default ProductGrid;
