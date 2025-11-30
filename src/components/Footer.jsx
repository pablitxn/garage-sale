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
            <div className="container">
                <div className="footer-content">
                    <div className="footer-contact">
                        <h3>📱 Contacto</h3>
                        <p>Coordinamos todo por WhatsApp</p>
                        <button onClick={handleWhatsAppClick} className="whatsapp-button">
                            Escribinos al WhatsApp
                        </button>
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
