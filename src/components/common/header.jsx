import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/header.css";

const NAV_ITEMS = [
    { name: "Home", path: "/", key: "home" },
    { name: "Features", path: "/features", key: "features" },
    { name: "Solutions", path: "/solutions", key: "solutions" },
];

const Header = ({ active }) => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    const activeStyle = {

    };

    return (
        <header className="header-container">
            <div className="navbar-container">
                <nav className="navbar">
                    <ul className="nav-list">
                        {NAV_ITEMS.map(({ name, path, key }) => (
                            <li key={key}>
                                <button
                                    onClick={() => navigate(path)}
                                    className={`nav-button ${
                                        active === key ? "active" : ""
                                    }`}
                                >
                                    {name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
