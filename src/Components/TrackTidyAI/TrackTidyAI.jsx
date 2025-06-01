import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {useAuth} from "../../service/AuthContext.jsx";
import Swal from 'sweetalert2';

function TrackTidyChatbot() {

    const [messages, setMessages] = useState([
        { role: 'assistant', content: "👋 Hey! I'm TrackTidy Assistant. What are your main preferences focused onto?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatRef = useRef(null);

    const { user } = useAuth(); // Get user for auth headers

    const handleConfirmPackage = async (pkg) => {
        const groceryValue = pkg.breakdown?.Grocery ?? 0;
        const serviceValue = pkg.breakdown?.Maintenance ?? 0;
        const inventoryValue = pkg.breakdown?.Inventory ?? 0;
        const today = new Date().toISOString().split('T')[0];

        try {
            const checkResponse = await fetch(
                "http://localhost:8080/api/track-tidy/package/getAll",
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`,
                    },
                }
            );

            const packages = await checkResponse.json();
            if (!checkResponse.ok) throw new Error("Failed to fetch packages");

            const existingPackage = packages.find(p => p.userId === user?.email);

            if (existingPackage && existingPackage.packageType) {
                Swal.fire({
                    title: 'Subscription Error',
                    text: 'You already have an active package subscription.',
                    icon: 'error',
                    confirmButtonColor: '#166534',
                });
                return;
            }

            const response = await axios.post(
                'http://localhost:8080/api/track-tidy/package/create',
                {

                    packageType: 'Custom Package',
                    packageValue: pkg.totalBudget,
                    groceryValue: groceryValue,
                    serviceValue: serviceValue,
                    inventoryValue: inventoryValue,
                    subscribedDate: today,
                    userId: user?.email,
                },
                {
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`,
                        'Content-Type': 'application/json', // Ensure Content-Type is set for POST requests with a body
                    },
                }
            );

            if (response.status === 201) {
                Swal.fire({
                    title: 'Success 🎉',
                    text: 'Package saved successfully!',
                    icon: 'success',
                    confirmButtonColor: '#166534',
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: '❌ Failed to save the package.',
                    icon: 'error',
                    confirmButtonColor: '#166534',
                });
            }

        } catch (err) {
            console.error(err);
            Swal.fire({
                title: 'Error',
                text: '❌ Failed to save the package.',
                icon: 'error',
                confirmButtonColor: '#166534',
            });
        }
    };


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
                { userPromptRequest: input }, // matches UserPromptRequest field
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

    function extractPackageJson(message) {
        try {
            const jsonStart = message.indexOf('{');
            const jsonEnd = message.lastIndexOf('}');
            if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
                const jsonStr = message.slice(jsonStart, jsonEnd + 1);
                return JSON.parse(jsonStr);
            }
        } catch (e) {
            return null;
        }
        return null;
    }

    return (
        <div className="w-full max-w-2xl mx-auto mt-8 bg-gradient-to-b from-green-50 via-slate-50 to-white rounded-2xl shadow-2xl flex flex-col h-[80vh] border overflow-hidden">
            <div ref={chatRef} className="flex-1 text-start overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-green-100 via-slate-50 to-green-50">
                {messages.map((msg, index) => {
                    const isAssistant = msg.role === 'assistant';
                    const extractedPackage = isAssistant ? extractPackageJson(msg.content) : null;

                    return (
                        <div
                            key={index}
                            className={`flex items-end ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {isAssistant && (
                                <div className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center text-sm mr-2">
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
                                {extractedPackage ? (
                                    <div>
                                        <div className="font-semibold text-green-800 mb-1">{extractedPackage.type}</div>
                                        <div className="text-sm mb-2">💰 Total Budget: <strong>Rs. {extractedPackage.totalBudget}</strong></div>
                                        <ul className="pl-4 text-sm list-disc mb-2">
                                            {Object.entries(extractedPackage.breakdown).map(([key, val]) => (
                                                <li key={key}>
                                                    {key}: Rs. {val}
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="italic text-green-700">💡 {extractedPackage.comment}</p>
                                        <button
                                            className="mt-3 bg-green-700 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition"
                                            onClick={() => handleConfirmPackage(extractedPackage)}
                                        >
                                            ✅ Confirm this package
                                        </button>
                                    </div>
                                ) : (
                                    msg.content
                                )}
                            </div>

                            {msg.role === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-green-700 text-gray-800 flex items-center justify-center text-sm ml-2">
                                    🙋
                                </div>
                            )}
                        </div>
                    );
                })}

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