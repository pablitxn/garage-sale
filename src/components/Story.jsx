import React from 'react';
import './Story.css';

const Story = () => {
    return (
        <section className="story-section">
            <div className="container">
                <div className="story-content">
                    <h2>La Historia</h2>
                    <p>
                        Después de 7 años en este depto, nos vamos a vivir al sur.
                        Estas cosas nos acompañaron en momentos increíbles, pero no caben en la nueva vida (ni en la valija).
                        Preferimos que sigan siendo útiles y contando historias en tu casa a que terminen olvidadas.
                    </p>
                    <p className="story-highlight">
                        Todo se va con buena energía. ✨
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Story;
