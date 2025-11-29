import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products }) => {
    if (products.length === 0) {
        return (
            <div className="empty-state">
                <p>No hay productos en esta categoría... por ahora. 👀</p>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
