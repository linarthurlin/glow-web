import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

// node backend\index.js

const app = express();
app.use(cors());
app.use(express.json());

console.log("Gemini API KEY:", process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/api/gemini", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // response.text contains the generated text
    res.json({ reply: response.text });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
