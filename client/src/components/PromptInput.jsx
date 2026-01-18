import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMagic, FaSpinner } from 'react-icons/fa';
import axios from 'axios';

const PromptInput = ({ setOptimizedPrompt }) => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setLoading(true);
        setError(null);
        setOptimizedPrompt(''); // Clear previous result

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await axios.post(`${apiUrl}/optimize`, { prompt });
            setOptimizedPrompt(response.data.optimizedPrompt);
        } catch (err) {
            setError('Failed to optimize prompt. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="bg-zinc-900/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/5 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                <div className="relative z-10 mb-6">
                    <label htmlFor="prompt" className="block text-xs font-semibold text-primary tracking-widest uppercase mb-3 ml-1">
                        Input Command
                    </label>
                    <textarea
                        id="prompt"
                        rows="4"
                        className="w-full bg-black/40 rounded-xl border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-white placeholder-gray-600 p-5 transition-all duration-300 outline-none resize-none font-mono text-sm leading-relaxed"
                        placeholder="Describe your task..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                </div>

                {error && <p className="text-red-400 text-sm mb-4 bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>}

                <button
                    type="submit"
                    disabled={loading || !prompt.trim()}
                    className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,220,130,0.3)] hover:shadow-[0_0_30px_rgba(0,220,130,0.5)] transform hover:translate-y-[-1px]"
                >
                    {loading ? (
                        <FaSpinner className="animate-spin text-lg" />
                    ) : (
                        <>
                            <FaMagic className="text-lg" />
                            <span className="tracking-wide">OPTIMIZE</span>
                        </>
                    )}
                </button>
            </motion.form>
        </div>
    );
};

export default PromptInput;
