import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function TrackTidyChatbot() {

    const [messages, setMessages] = useState([
        { role: 'assistant', content: "👋 Hey! I'm TrackTidy Assistant. What are your main preferences focused onto?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatRef = useRef(null);

    useEffect(() => {
        chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages, isTyping]);

    const sendMessage = async () => {
        if (!input.trim()) return;
        console.log('Sending message...', input.trim());

        const userMessage = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await axios.post(
                'http://localhost:8080/api/track-tidy/track-ai/generate-package',
                { userPromptRequest: input }, // ✅ matches UserPromptRequest field
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const assistantMessage = response.data;
            setMessages((prev) => [...prev, { role: 'assistant', content: assistantMessage }]);
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [...prev, { role: 'assistant', content: '⚠️ Oops! Something went wrong. Please try again.' }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    return (
        <div className="w-full max-w-2xl mx-auto mt-8 bg-gradient-to-b from-green-50 via-slate-50 to-white rounded-2xl shadow-2xl flex flex-col h-[80vh] border overflow-hidden">
            <div ref={chatRef} className="flex-1 text-start overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-green-100 via-slate-50 to-green-50">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex items-end ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {msg.role === 'assistant' && (
                            <div className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center text-start text-sm mr-2">
                                🤖
                            </div>
                        )}
                        <div
                            className={`px-4 py-3 max-w-[75%] rounded-2xl shadow-md text-sm leading-relaxed ${
                                msg.role === 'user'
                                    ? 'bg-green-800 text-white rounded-br-none'
                                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                            }`}
                        >
                            {msg.content}
                        </div>
                        {msg.role === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-green-700 text-gray-800 flex items-center justify-center text-sm ml-2">
                                🙋
                            </div>
                        )}
                    </div>
                ))}

                {isTyping && (
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className="animate-pulse">TrackTidy is typing...</span>
                    </div>
                )}
            </div>

            <div className="border-t p-4 flex items-center bg-green-50 rounded-2xl shadow-md text-sm leading-relaxed">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask your assistant..."
                    className="flex-1 p-3 border rounded-xl mr-2 focus:outline-none focus:ring focus:border-green-500"
                />
                <button
                    onClick={sendMessage}
                    className="bg-green-800 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default TrackTidyChatbot;
