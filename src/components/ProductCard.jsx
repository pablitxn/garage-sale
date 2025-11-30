import React from 'react';
import { WHATSAPP_NUMBER } from '../constants';
import './ProductCard.css';

const ProductCard = ({ product, onClick }) => {
    const isSold = product.status === 'sold';
    const isReserved = product.status === 'reserved';
    const images = product.images || [];
    const mainImage = images[0] || product.image; // Fallback to single image if exists

    const getButtonText = () => {
        if (isSold) return 'Ya encontró hogar 🏠';
        if (isReserved) return 'Alguien lo está pensando...';
        return '¡Me lo llevo!';
    };

    const handleWhatsAppClick = (e) => {
        e.stopPropagation(); // Prevent card click
        if (isSold) return;

        const message = `Hola! Vi ${product.name} en tu venta de garage. ¿Sigue disponible? Me interesa 🙌`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    };

    return (
        <div className={`product-card ${product.status}`} onClick={onClick}>
            <div className="product-image-container">
                <img src={mainImage} alt={product.name} className="product-image" />
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

                <button
                    className={`action-btn ${product.status}`}
                    onClick={handleWhatsAppClick}
                    disabled={isSold}
                >
                    {getButtonText()}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

