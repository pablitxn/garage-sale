import React from 'react';
import './Story.css';

const Story = () => {
    return (
        <section className="story-section">
            <div className="container">
                <div className="story-content">
                    <h2>La Historia</h2>
                    <p>
                        Hola! Soy Fiona 🇫🇷. Viví 3 años increíbles en Buenos Aires, pero ahora toca volver a París.
                        Me llevo mil recuerdos, pero no me puedo llevar los muebles (ni las plantas!).
                    </p>
                    <p>
                        Todo lo que ves acá fue parte de mi hogar porteño. Ojalá encuentren un nuevo lugar donde los quieran tanto como yo.
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
