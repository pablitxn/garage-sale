import React, { useState, useEffect } from 'react';
import { WHATSAPP_NUMBER } from '../constants';
import { shareProduct } from '../utils/shareProduct';
import './ProductDetail.css';

const ProductDetail = ({ product, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!product) return null;

    const isSold = product.status === 'sold';
    const isShareDisabled = isSold || product.status === 'reserved';
    const images = product.images || [];

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const handleWhatsAppClick = () => {
        if (isSold) return;

        const message = `Hola Fiona! Vi "${product.name}" en tu garage sale y me encantó. ¿Sigue disponible?`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    };

    const handleShareClick = async () => {
        if (isShareDisabled) return;
        await shareProduct(product);
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose} aria-label="Cerrar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" />
                        <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" />
                    </svg>
                </button>

                <div className="modal-body">
                    <div className={`modal-gallery ${product.status}`}>
                        {images.length > 0 && (
                            <>
                                <img
                                    src={images[currentImageIndex]}
                                    alt={`${product.name} - imagen ${currentImageIndex + 1}`}
                                    className="modal-image"
                                    loading="lazy"
                                    decoding="async"
                                />
                                {images.length > 1 && (
                                    <>
                                        <button
                                            className="gallery-btn prev"
                                            onClick={handlePrevImage}
                                            aria-label="Imagen anterior"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <polyline points="15 18 9 12 15 6" strokeWidth="2" />
                                            </svg>
                                        </button>
                                        <button
                                            className="gallery-btn next"
                                            onClick={handleNextImage}
                                            aria-label="Imagen siguiente"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <polyline points="9 18 15 12 9 6" strokeWidth="2" />
                                            </svg>
                                        </button>
                                        <div className="image-indicators">
                                            {images.map((_, index) => (
                                                <button
                                                    key={index}
                                                    className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                                                    onClick={() => setCurrentImageIndex(index)}
                                                    aria-label={`Ir a imagen ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>

                    <div className="modal-info">
                        <div className="modal-header">
                            <div>
                                <h2 className="modal-title">{product.name}</h2>
                                <p className="modal-category">{product.category}</p>
                            </div>
                            <div className="modal-price">
                                {product.price === 0 ? 'GRATIS' : `€${product.price}`}
                            </div>
                        </div>

                        {product.status !== 'available' && (
                            <div className={`modal-status-badge ${product.status}`}>
                                {product.status === 'sold' ? 'VENDIDO' : 'RESERVADO'}
                            </div>
                        )}

                        <div className="modal-details">
                            <div className="detail-section">
                                <h3>Descripción</h3>
                                <p>{product.description}</p>
                            </div>

                            <div className="detail-grid">
                                {product.condition && (
                                    <div className="detail-item">
                                        <span className="detail-label">Condición</span>
                                        <span className="detail-value">{product.condition}</span>
                                    </div>
                                )}

                                {product.dimensions && (
                                    <div className="detail-item">
                                        <span className="detail-label">Dimensiones</span>
                                        <span className="detail-value">
                                            {product.dimensions.height} × {product.dimensions.width} × {product.dimensions.depth} cm
                                        </span>
                                    </div>
                                )}

                                {product.dateAdded && (
                                    <div className="detail-item">
                                        <span className="detail-label">Publicado</span>
                                        <span className="detail-value">{formatDate(product.dateAdded)}</span>
                                    </div>
                                )}

                                {product.dateUpdated && product.dateUpdated !== product.dateAdded && (
                                    <div className="detail-item">
                                        <span className="detail-label">Actualizado</span>
                                        <span className="detail-value">{formatDate(product.dateUpdated)}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button
                                className={`modal-action-btn ${product.status}`}
                                onClick={handleWhatsAppClick}
                                disabled={isSold}
                            >
                                {isSold ? 'Ya encontró hogar 🏠' : '¡Me interesa! Contactar por WhatsApp'}
                            </button>
                            <button
                                type="button"
                                className="modal-share-btn"
                                onClick={handleShareClick}
                                aria-label={`Compartir ${product.name}`}
                                disabled={isShareDisabled}
                            >
                                Compartir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
