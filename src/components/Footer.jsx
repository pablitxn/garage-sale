import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>📍 Retiro</h3>
                        <p>Calle Falsa 123, Depto 4B</p>
                        <p>Sábado 15 de Diciembre</p>
                        <p>10:00 - 18:00 hs</p>
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
