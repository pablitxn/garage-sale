import React from 'react';
import './ProductCard.css';
import { shareProduct } from '../utils/shareProduct';

const ProductCard = ({ product, onClick }) => {
    const isSold = product.status === 'sold';
    const isReserved = product.status === 'reserved';
    const images = product.images || [];
    const mainImage = images[0] || product.image; // Fallback to single image if exists
    const isShareDisabled = isSold || isReserved;

    const getButtonText = () => {
        if (isSold) return 'Ya encontró hogar 🏠';
        if (isReserved) return 'Ver detalles';
        return 'Ver detalles';
    };

    const handleShareClick = async (event) => {
        event.stopPropagation();
        if (isShareDisabled) return;
        await shareProduct(product);
    };

    return (
        <div
            id={`producto-${product.id}`}
            className={`product-card ${product.status}`}
            onClick={onClick}
        >
            <div className="product-image-container">
                <img
                    src={mainImage}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                    decoding="async"
                />
                {product.status !== 'available' && (
                    <div className="status-badge">
                        {isSold ? 'VENDIDO' : 'RESERVADO'}
                    </div>
                )}
                {images.length > 1 && (
                    <div className="images-badge">
                        📷 {images.length}
                    </div>
                )}
            </div>
            <div className="product-info">
                <div className="product-header">
                    <h3 className="product-name">{product.name}</h3>
                    <span className="product-price">
                        {product.price === 0 ? 'GRATIS' : `€${product.price}`}
                    </span>
                </div>
                <p className="product-category">{product.category}</p>
                {product.condition && (
                    <p className="product-condition">{product.condition}</p>
                )}
                <p className="product-description">{product.description}</p>

                <div className="card-actions">
                    <button
                        className={`action-btn ${product.status}`}
                        disabled={isSold}
                    >
                        {getButtonText()}
                    </button>
                    <button
                        type="button"
                        className="share-btn"
                        onClick={handleShareClick}
                        aria-label={`Compartir ${product.name}`}
                        disabled={isShareDisabled}
                    >
                        Compartir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

