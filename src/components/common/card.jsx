import React from "react";

import "./styles/card.css";

const Card = ({ icon: Icon, title, description, onHover, onLeave }) => {
    return (
        <div onMouseEnter={onHover} onMouseLeave={onLeave}>
            <a href="#" className="card-item">
                <div className="card-container">
                    <Icon stroke={2} />
                    <div className="card-content">
                        <h2 className="card-title">{title}</h2>
                        <p className="card-article">{description}</p>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default Card;
