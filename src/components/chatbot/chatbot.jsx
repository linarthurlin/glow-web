import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import "./styles/chatbot.css";

const ChatBot = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const pageHTML = document.documentElement.outerHTML;
        const pageText = document.body.innerText;
        const pageScripts = Array.from(document.scripts)
            .map((s) => s.textContent)
            .join("\n\n");

        const prompt = `
            You are an assistant/chatbot helping the user with questions about the current web page — or general conversation.

            User message: ${input}

            Below is the current web page content in case it helps:

            HTML:
            ${pageHTML}

            Visible Text:
            ${pageText}

            JavaScript Code:
            ${pageScripts}

            Instructions:
            - If the user's message is general (e.g., greetings, casual questions), respond naturally and conversationally without referencing the web page.
            - If the user's message clearly relates to the content, structure, or functionality of the web page, then use the page data to answer.
            - Always be clear, concise, and beginner-friendly.
            - If the page content is irrelevant, feel free to ignore it.
        `;

        const newMessages = [...messages, { role: "user", content: input }];
        setMessages(newMessages);
        setIsTyping(true);

        try {
            const res = await axios.post("http://localhost:5000/api/gemini", {
                prompt,
            });

            setMessages([
                ...newMessages,
                { role: "assistant", content: res.data.reply },
            ]);
            setInput("");
        } catch (err) {
            console.error("Error contacting Gemini API:", err);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className={`chatbot-container ${isOpen ? "open" : "closed"}`}>
            <button
                className="chatbot-toggle"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? "✖" : "💬"}
            </button>

            {isOpen && (
                <div className="chatbot">
                    <div className="chat-header">🤖 Gemini Assistant</div>
                    <div className="chat-messages">
                        {messages.map((msg, i) => (
                            <div key={i} className={`message ${msg.role}`}>
                                <div className="avatar">
                                    {msg.role === "user" ? "🧑" : "🤖"}
                                </div>
                                <div className="content">{msg.content}</div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message assistant typing">
                                <div className="avatar">🤖</div>
                                <div className="content">Typing...</div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="chat-input">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSend();
                            }}
                        />
                        <button onClick={handleSend}>➤</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
