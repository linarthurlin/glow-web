import React from "react";
import "./styles/webflow-input.css";

const WebflowInput = () => {
    return (
        <div className="webflow-container">
            <div className="webflow-input-wrapper">
                <input
                    type="email"
                    placeholder="Enter your email address"
                    className="webflow-input"
                />
                <button type="submit" className="webflow-button">
                    Join Waitlist
                </button>
                <div className="webflow-underline"></div>
            </div>
        </div>
    );
};

export default WebflowInput;
