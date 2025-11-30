import React from 'react';
import './FilterBar.css';

const FilterBar = ({ categories, activeCategories, onToggleCategory, onClearCategories }) => {
    const hasSelection = activeCategories.length > 0;
    const pluralizedSelection = hasSelection && activeCategories.length > 1;

    return (
        <div className="filter-bar-container">
            <div className="filter-section">
                <div className="filter-labels">
                    <span className="filter-label">Categorías</span>
                    <span className="filter-hint">
                        {hasSelection
                            ? `${activeCategories.length} seleccionada${pluralizedSelection ? 's' : ''}`
                            : 'Mostrando todas'}
                    </span>
                </div>
                <div className="filter-bar" role="group" aria-label="Filtrar por categorías">
                    <button
                        className={`filter-bar-btn reset ${!hasSelection ? 'active' : ''}`}
                        onClick={onClearCategories}
                        aria-pressed={!hasSelection}
                    >
                        Todas
                    </button>
                    {categories.map(category => {
                        const isActive = activeCategories.includes(category);

                        return (
                            <button
                                key={category}
                                className={`filter-bar-btn ${isActive ? 'active' : ''}`}
                                onClick={() => onToggleCategory(category)}
                                aria-pressed={isActive}
                            >
                                <span className="filter-bar-check" aria-hidden="true">{isActive ? '✓' : ''}</span>
                                <span className="filter-bar-label">{category}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FilterBar;

