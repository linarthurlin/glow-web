import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";

import { IconSquareRoundedArrowRight } from "@tabler/icons-react";

// Components
import Logo from "../components/common/Logo";
import Card from "../components/common/card";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import WebflowInput from "../components/common/webflow-input";
import InteractiveCanvas from "../components/common/interactive-canvas";

// Chatbot
import ChatBot from "../components/chatbot/chatbot";

// Actions
import LinkGlowScanner from "../components/extension/actions";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/homepage.css";

const Homepage = () => {
    const [stayLogo, setStayLogo] = useState(false);
    const [logoSize, setLogoSize] = useState(150);

    // Card Style
    const [cardActiveStyle, setCardActiveStyle] = useState(null);
    const cardRefs = useRef([]);
    useEffect(() => {
        cardRefs.current = Array(INFO.cards.length).fill(null);
    }, []);

    const handleCardHover = (index) => {
        const cardEl = cardRefs.current[index];
        const containerEl = document.querySelector(".homepage-cards-container");

        if (cardEl && containerEl) {
            const rect = cardEl.getBoundingClientRect();
            const containerRect = containerEl.getBoundingClientRect();

            setCardActiveStyle({
                width: `${rect.width}px`,
                height: `${rect.height}px`,
                transform: `translate(${rect.left - containerRect.left}px, ${
                    rect.top - containerRect.top - 6
                }px)`,
                opacity: 1,
            });
        }
    };

    const handleCardLeave = () => {
        setCardActiveStyle((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                opacity: 0,
            };
        });
    };

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
        borderColor: stayLogo
            ? "rgba(255, 255, 255, 1)"
            : "rgba(255, 255, 255, 0)",
        borderRadius: stayLogo ? "50%" : "5%",
        boxShadow: stayLogo ? "0px 4px 10px rgba(0, 0, 0, 0.5)" : "none",
        transition:
            "border-radius 2s ease, border-color 2s ease, box-shadow 2s ease",
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
                            <Logo
                                width={logoSize}
                                height={logoSize}
                                link={false}
                            />
                        </div>
                    </div>

                    {/* Homepage Cover */}
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
                                <LinkGlowScanner />
                                <a className="watch-our-demos" href="/">
                                    Watch our demos
                                    <IconSquareRoundedArrowRight
                                        stroke={2}
                                        className="demos-arrow-svg"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Homepage Section 1 */}
                    <div className="homepage-section-one">
                        <div className="homepage-cards-container">
                            <div
                                className={`homepage-sliding-card ${
                                    cardActiveStyle ? "active" : ""
                                }`}
                                style={{
                                    position: "absolute",
                                    pointerEvents: "none",
                                    transition: "all 0.5s ease-in-out",
                                    borderRadius: "2rem",
                                    background: "var(--quinary-color)",
                                    boxShadow:
                                        "0 6px 26px 6px rgba(0,0,0,0.25)",
                                    zIndex: 0,
                                    ...(cardActiveStyle || { opacity: 0 }),
                                }}
                            ></div>
                            {INFO.cards.map((card, index) => (
                                <div
                                    className="homepage-cards"
                                    key={index}
                                    ref={(el) => (cardRefs.current[index] = el)}
                                    onMouseEnter={() => handleCardHover(index)}
                                    onMouseLeave={handleCardLeave}
                                >
                                    <Card
                                        icon={card.icon}
                                        title={card.title}
                                        description={card.description}
                                    />
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: "20%" }}>
                            <WebflowInput />
                        </div>
                        <div style={{ marginTop: "20%" }}>
                            <ChatBot />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </React.Fragment>
    );
};

export default Homepage;
