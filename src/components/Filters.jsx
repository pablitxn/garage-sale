import React from 'react';
import './Filters.css';

const Filters = ({ currentFilter, onFilterChange }) => {
    const filters = [
        { id: 'all', label: 'Todo' },
        { id: 'available', label: 'Disponible' },
        { id: 'reserved', label: 'Reservado' },
    ];

    return (
        <div className="filters-container">
            <div className="filters">
                {filters.map((f) => (
                    <button
                        key={f.id}
                        className={`filter-btn ${currentFilter === f.id ? 'active' : ''}`}
                        onClick={() => onFilterChange(f.id)}
                    >
                        {f.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Filters;
