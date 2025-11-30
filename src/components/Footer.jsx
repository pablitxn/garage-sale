import React from 'react';
import { WHATSAPP_NUMBER } from '../constants';
import './Footer.css';

const Footer = () => {
    const handleWhatsAppClick = () => {
        const message = 'Hola! Vi tu venta de garage y me interesa consultar sobre algunos productos 🙌';
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    };

    return (
        <footer className="site-footer">
            <div className="footer-backdrop">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <p className="footer-eyebrow">Venta de garage</p>
                            <h3>Gracias por pasarte 👋</h3>
                            <p className="footer-description">
                                Si viste algo que te gustó, escribinos. Coordinamos rápido horario y retiro en
                                el domicilio.
                            </p>

                            <div className="footer-tags">
                                <span className="footer-tag">Retiro en domicilio</span>
                                <span className="footer-tag">Solo efectivo</span>
                                <span className="footer-tag">Reservas cortas</span>
                            </div>
                        </div>

                        <div className="footer-card">
                            <div className="footer-card__header">
                                <span className="footer-card__indicator" aria-hidden="true" />
                                <p className="footer-card__eyebrow">Coordinemos por WhatsApp</p>
                            </div>
                            <p className="footer-card__text">
                                Te confirmamos disponibilidad y te pasamos la dirección exacta en un toque.
                            </p>
                            <button onClick={handleWhatsAppClick} className="whatsapp-button">
                                Abrir chat de WhatsApp
                            </button>

                            <div className="footer-meta">
                                <span>🚗 Retiro en persona</span>
                                <span>⏱️ Respondemos rápido</span>
                            </div>
                        </div>
                    </div>

                    <div className="footer-disclaimer">
                        <p>🚚 <strong>No hacemos envíos.</strong> Se retira por el domicilio.</p>
                        <p className="footer-note">Traé bolsas reutilizables 🌿</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
