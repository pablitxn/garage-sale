import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="site-header">
            <div className="container">
                <div className="header-content">
                    <h1 className="site-title">Venta de Garage de Pablo</h1>
                    <div className="header-details">
                        <span className="detail-item">📅 Sábado 15 de Diciembre</span>
                        <span className="detail-item">📍 Calle Falsa 123, Depto 4B</span>
                        <span className="detail-item">⏰ 10:00 - 18:00 hs</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
