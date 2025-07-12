import React from "react";
import "./styles/actions.css";

let currentDiv = null;

export const simulateHoverScroll = async () => {
    const links = document.querySelectorAll("a, button, [role='button']");

    for (const el of links) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        await waitForScroll();

        removeOverlay();
        await drawOverlayBox(el);
    }

    removeOverlay();
};

function waitForScroll() {
    return new Promise((resolve) => setTimeout(resolve, 500));
}

export function drawOverlayBox(element) {
    return new Promise((resolve) => {
        const rect = element.getBoundingClientRect();
        const indication = document.createElement("div");
        indication.className = "indication-box";

        const boxWidth = 70;
        const boxHeight = 20;
        const centerX = rect.left + rect.width / 2 + window.scrollX;

        indication.style.left = `${centerX - boxWidth / 2}px`;
        indication.style.top = `${rect.top + window.scrollY - 30}px`;
        indication.style.width = `${boxWidth}px`;
        indication.style.height = `${boxHeight}px`;
		indication.textContent = "hover";

        // indication.style.width = `${rect.width}px`;
        // indication.style.height = `${rect.height}px`;
        // indication.style.top = `${rect.top + window.scrollY}px`;
        // indication.style.left = `${rect.left + window.scrollX}px`;

        document.body.appendChild(indication);
        currentDiv = indication;

        setTimeout(() => {
            if (indication === currentDiv) {
                indication.classList.add("fade-out");
                setTimeout(() => {
                    removeOverlay();
                    resolve();
                }, 500);
            } else {
                resolve();
            }
        }, 1000);
    });
}

export function removeOverlay() {
    if (currentDiv && currentDiv.parentNode) {
        currentDiv.parentNode.removeChild(currentDiv);
        currentDiv = null;
    }
}

const LinkGlowScanner = () => {
    return (
        <div>
            <button onClick={simulateHoverScroll}>Glow Search</button>
        </div>
    );
};

export default LinkGlowScanner;
