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
                    <div className="footer-content">
                        <h3>Gracias por pasarte 👋</h3>
                        <p className="footer-description">
                            Si viste algo que te gustó, escribinos para coordinar.
                        </p>

                        <button onClick={handleWhatsAppClick} className="whatsapp-button">
                            Coordinar por WhatsApp
                        </button>

                        <div className="footer-disclaimer">
                            <p>📍 Se retira por el domicilio. <strong>No hacemos envíos.</strong></p>
                            <p className="footer-note">Traé bolsas reutilizables 🌿</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
