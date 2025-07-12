// node backend/index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/api/gemini", async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const reply = response.text.trim();
        let cleaned = reply;

        if (reply.startsWith("```json")) {
            cleaned = reply.replace(/```json|```/g, "").trim();
        }

        try {
            const json = JSON.parse(cleaned);
            const filePath = path.resolve("backend/target.json");
            fs.writeFileSync(filePath, JSON.stringify(json, null, 2), "utf-8");
            console.log("✅ JSON saved to", filePath);
        } catch (jsonErr) {
            console.warn("⚠️ Invalid JSON, skipping save.");
        }

        res.status(200).json({ reply });
    } catch (error) {
        console.error("❌ Gemini error:", error);
        res.status(200).json({
            reply: "⚠️ An error occurred, but here's the last known response (may be incomplete).",
        });
    }
});

app.listen(5000, () => {
    console.log("✅ Server running on http://localhost:5000");
});
