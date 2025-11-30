import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>📞 Contacto</h3>
                        <p>Coordinamos todo por WhatsApp</p>
                        <a href="https://wa.me/5491112345678" target="_blank" rel="noopener noreferrer" className="whatsapp-button">
                            Escribinos al WhatsApp
                        </a>
                    </div>
                    <div className="footer-section">
                        <h3>💸 Medios de Pago</h3>
                        <p>Efectivo, Transferencia, Mercado Pago</p>
                    </div>
                    <div className="footer-section">
                        <h3>🚚 Envíos</h3>
                        <p>No hacemos envíos. Se retira por el domicilio.</p>
                        <p>Traé bolsas reutilizables! 🌿</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>Hecho con ❤️ para que estas cosas sigan rodando.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
