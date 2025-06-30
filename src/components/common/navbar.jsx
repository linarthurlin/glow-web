import React from "react";
import { Link } from "react-router-dom";

import INFO from "../../data/user";

import "./styles/navbar.css";

const NavBar = (props) => {
    const { active } = props;

    return (
        <React.Fragment>
            <div className="nav-container">
                <div className="logo-container">
                    <img src={INFO.main.logo} alt="logo" className="logo" />
                </div>
                <nav className="navbar">
                    <div className="nav-background">
                        <ul className="nav-list">
                            <li
                                className={
                                    active === "home"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link to={"/"}>Home</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </React.Fragment>
    );
};

export default NavBar;
