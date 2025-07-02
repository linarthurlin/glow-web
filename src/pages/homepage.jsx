import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Logo from "../components/common/Logo";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import WebflowInput from "../components/common/webflow-input";
import InteractiveCanvas from "../components/common/interactive-canvas";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/homepage.css";

const Homepage = () => {
    const [stayLogo, setStayLogo] = useState(false);
    const [logoSize, setLogoSize] = useState(150);
    
    const maxLogoSize = 150;
    const minLogoSize = 80;
    const shrinkRate = 0.8;
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    useEffect(() => {
        const handleScroll = () => {
            const scroll = window.scrollY;
            let newSize = maxLogoSize - scroll * shrinkRate;
    
            if (newSize <= minLogoSize) {
                setStayLogo(true);
                setLogoSize(minLogoSize);
            } else {
                setStayLogo(false);
                setLogoSize(newSize);
            }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const currentSEO = SEO.find((item) => item.page === "home");

    const logoStyle = {
        display: "flex",
        position: stayLogo ? "fixed" : "relative",
        top: stayLogo ? "2vh" : "auto",
        left: stayLogo ? "2vw" : "auto",
        zIndex: 999,
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: stayLogo ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
        borderRadius: stayLogo ? "50%" : "5%",
        boxShadow: stayLogo ? "0px 4px 10px rgba(0, 0, 0, 0.5)" : "none",
        transition: "border-radius 2s ease, border-color 2s ease, box-shadow 2s ease",
    };
    

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
                <Header active="home" />

                <div className="homepage-container">
                    <InteractiveCanvas />

                    <div className="homepage-logo-container">
                        <div style={logoStyle}>
                            <Logo width={logoSize} height={logoSize} link={false} />
                        </div>
                    </div>

                    <div className="homepage-cover">
                        <div className="homepage-cover-title-container">
                            <div>
                                <h1>Glow Glow Glow</h1>
                            </div>
                            <div>
                                <h2>
                                    Your Built-in Smart Navigation - ditch the
                                    manuals, just follow the GLOW!
                                </h2>
                            </div>
                            <div className="homepage-buttons-container">
                                <button className="button-talk-to-sales">
                                    Talk to sales
                                </button>
                                <a class="watch-our-demos" href="/">
                                    Watch our demos
                                    <img src="/go-arrow.png" alt="Go arrow" />
                                </a>
                            </div>
                            <div>
                                <WebflowInput />
                            </div>
                        </div>
                    </div>

                    <div className="homepage-section-one">
                        <div className="homepage-cards-container">
                            <div className="homepage-cards">
                                <div className="card-container">
                                    <h2>🔍</h2>
                                    <div className="card-content">
                                        <h2 className="card-title">
                                            Intent-Aware Navigation
                                        </h2>
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
                                <div className="card-container">
                                    <h2>✨</h2>
                                    <div className="card-content">
                                        <h2 className="card-title">
                                            Real-Time Visual Guidance
                                        </h2>
                                        <p className="card-article">
                                            Instead of vague text instructions,
                                            users get on-screen visual cues—like
                                            highlights, glows, or
                                            animations—that gently guide their
                                            clicks. It's like having a live
                                            tutor built into the interface.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="homepage-cards">
                                <div className="card-container">
                                    <h2>📊</h2>
                                    <div className="card-content">
                                        <h2 className="card-title">
                                            User Struggle Analytics
                                        </h2>
                                        <p className="card-article">
                                            Built-in dashboard that shows where
                                            users get stuck, what they ask for
                                            most, and how long it takes them to
                                            complete tasks—providing product
                                            teams with insights to optimize UX
                                            continuously.
                                        </p>
                                    </div>
                                </div>
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
