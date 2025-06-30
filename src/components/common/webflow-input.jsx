import React from "react";
import "./styles/webflow-input.css";

const WebflowInput = () => {
  return (
    <div className="webflow-container">
      <div className="webflow-input-wrapper">
        <input
          type="email"
          placeholder="What's your email?"
          className="webflow-input"
        />
        <button type="submit" className="webflow-button">
          ➤
        </button>
        <div className="webflow-underline"></div>
      </div>
    </div>
  );
};

export default WebflowInput;