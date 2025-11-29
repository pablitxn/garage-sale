import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const isSold = product.status === 'sold';
    const isReserved = product.status === 'reserved';

    const getButtonText = () => {
        if (isSold) return 'Ya encontró hogar 🏠';
        if (isReserved) return 'Alguien lo está pensando...';
        return '¡Me lo llevo!';
    };

    const handleWhatsAppClick = () => {
        if (isSold) return;

        const message = `Hola! Vi ${product.name} en tu venta de garage. ¿Sigue disponible? Me interesa 🙌`;
        const encodedMessage = encodeURIComponent(message);
        // Replace with actual number
        const phoneNumber = '123456789';
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    return (
        <div className={`product-card ${product.status}`}>
            <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                {product.status !== 'available' && (
                    <div className="status-badge">
                        {isSold ? 'VENDIDO' : 'RESERVADO'}
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
