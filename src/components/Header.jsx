import React from 'react';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = () => {
    return (
        <header className="site-header">
            <div className="container">
                <div className="header-content">
                    <div className="header-top">
                        <h1 className="site-title">Venta de Garage de Fiona</h1>
                        <ThemeToggle />
                    </div>
                    <p className="site-subtitle">Mudanza a París 🇫🇷</p>
                </div>
            </div>
        </header>
    );
};

export default Header;
