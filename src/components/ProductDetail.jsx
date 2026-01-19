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
    const currentImageRotation = product.imageRotations?.[String(currentImageIndex)] || 0;

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
                                    style={currentImageRotation ? { transform: `rotate(${currentImageRotation}deg)` } : undefined}
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
                                {product.price === 0 ? 'GRATIS' : `$${product.price.toLocaleString('es-AR')}`}
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
                            {product.name.toLowerCase().includes('jabones') && (
                                <a
                                    href="https://instagram.com/la.lune.decroissante"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="modal-instagram-btn"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                    Mis jabones en Instagram
                                </a>
                            )}
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
