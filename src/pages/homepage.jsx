import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navbar";
import Footer from "../components/common/footer";
import WebflowInput from "../components/common/webflow-input";
import InteractiveCanvas from "../components/common/interactive-canvas";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/homepage.css";

const Homepage = () => {
    const [stayLogo, setStayLogo] = useState(false);
    const [logoSize, setLogoSize] = useState(80);
    const [oldLogoSize, setOldLogoSize] = useState(80);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            let scroll = Math.round(window.pageXOffset, 2);
            let newLogoSize = 80 - (scroll * 4) / 10;

            if (newLogoSize < oldLogoSize) {
                if (newLogoSize > 40) {
                    setLogoSize(newLogoSize);
                    setOldLogoSize(newLogoSize);
                    setStayLogo(false);
                } else {
                    setStayLogo(true);
                }
            } else {
                setLogoSize(newLogoSize);
                setStayLogo(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [logoSize, oldLogoSize]);

    const currentSEO = SEO.find((item) => item.page === "home");

    return (
        <React.Fragment>
            <Helmet>
                <title>{INFO.main.title}</title>
                <meta name="description" content={currentSEO.description} />
                <meta
                    name="keywords"
                    content={currentSEO.keywords.join(", ")}
                />
            </Helmet>

            <div className="page-content">
                <NavBar active="home" />

                <div className="homepage-container">
                    <InteractiveCanvas />

                    <div className="homepage-cover">
                        <div className="homepage-cover-title-container">
                            <div>
                                <h1>Glow! Glow! Glow!</h1>
                            </div>
                            <div>
                                <h2>Your Built-In Smart Navigation</h2>
                            </div>
                            <div>
                                <WebflowInput></WebflowInput>
                            </div>
                        </div>
                    </div>

                    <div className="homepage-section-one">
                        <div className="homepage-cards-container">
                            <div className="homepage-cards">
                                <div className="card-container">
                                    <h2>🔍</h2>
                                    <div className="card-content">
                                        <h2 className="card-title">Intent-Aware Navigation</h2>
                                        <p className="card-article">
                                            The assistant doesn't just
                                            keyword-match—it understands user
                                            intent using natural language
                                            processing. Whether someone types
                                            "change my card" or "update billing
                                            info," it knows they mean the same
                                            thing and routes accordingly.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="homepage-cards">
                                <h2>Your AI Assistance</h2>
                            </div>
                            <div className="homepage-cards">
                                <h2>Your AI Assistance</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </React.Fragment>
    );
};

export default Homepage;
