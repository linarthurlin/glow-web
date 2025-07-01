import React, { useEffect, useRef } from "react";
import "./styles/interactive-canvas.css";
import { gsap } from "gsap";

const DOT_RADIUS = 1;
const SCALE = 20;

function interpolateColor(color1, color2, t) {
	const r = Math.round(color1.r + (color2.r - color1.r) * t);
	const g = Math.round(color1.g + (color2.g - color1.g) * t);
	const b = Math.round(color1.b + (color2.b - color1.b) * t);
	return `rgb(${r}, ${g}, ${b})`;
}

export default function InteractiveCanvas() {
	const canvasRef = useRef(null);
	const dotsRef = useRef([]);
	const ctxRef = useRef(null);

	const generateDots = (width, height) => {
		const cols = Math.ceil(width / SCALE);
		const rows = Math.ceil(height / SCALE);
		const dots = [];
		for (let x = 0; x < cols; x++) {
			for (let y = 0; y < rows; y++) {
				dots.push({
					x: x * SCALE,
					y: y * SCALE,
					radius: DOT_RADIUS,
					color: "rgba(170, 170, 170, 0.3)",
				});
			}
		}
		dotsRef.current = dots;
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		ctxRef.current = ctx;

		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			generateDots(canvas.width, canvas.height);
		};

		resizeCanvas(); // initial setup
		window.addEventListener("resize", resizeCanvas);

		const render = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			dotsRef.current.forEach((d) => {
				ctx.beginPath();
				ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
				ctx.fillStyle = d.color;
				ctx.fill();
			});
			requestAnimationFrame(render);
		};
		render();

		const handleMouseMove = (e) => {
			const mx = e.clientX;
			const my = e.clientY;
			const maxDistance = SCALE * 10;
			const maxRadius = 5;

			const startColor = { r: 170, g: 170, b: 170, a: 0.1 };
			const endColor = { r: 160, g: 273, b: 255, a: 0.2 };

			dotsRef.current.forEach((d) => {
				const dx = d.x - mx;
				const dy = d.y - my;
				const dist = Math.sqrt(dx * dx + dy * dy);
				const t = 1 - Math.min(dist, maxDistance) / maxDistance;

				gsap.to(d, {
					radius: DOT_RADIUS + t * (maxRadius - DOT_RADIUS),
					duration: 0.3,
					ease: "power2.out",
				});
				d.color = interpolateColor(startColor, endColor, t);
			});
		};

		const handleMouseLeave = () => {
			dotsRef.current.forEach((d) =>
				gsap.to(d, {
					radius: DOT_RADIUS,
					duration: 0.4,
					ease: "power2.out",
				})
			);
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			window.removeEventListener("resize", resizeCanvas);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, []);

	return <canvas ref={canvasRef} className="interactive-canvas" />;
}
