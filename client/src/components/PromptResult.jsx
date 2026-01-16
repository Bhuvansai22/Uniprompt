import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCopy, FaCheck } from 'react-icons/fa';

const PromptResult = ({ optimizedPrompt }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(optimizedPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {optimizedPrompt && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-2xl mx-auto mt-8"
                >
                    <div className="bg-zinc-900/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-primary/20 relative overflow-hidden group hover:border-primary/40 transition-colors duration-300">
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                Output
                            </h3>
                            <button
                                onClick={handleCopy}
                                className="text-gray-400 hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10 border border-transparent hover:border-primary/20"
                                title="Copy to clipboard"
                            >
                                {copied ? <FaCheck className="text-primary" /> : <FaCopy />}
                            </button>
                        </div>

                        <div className="bg-black/40 rounded-xl p-6 border border-white/5 relative">
                            <p className="text-gray-200 whitespace-pre-wrap leading-loose font-light">
                                {optimizedPrompt}
                            </p>
                        </div>

                        <div className="mt-6 text-[10px] text-center text-gray-600 uppercase tracking-widest font-semibold flex justify-center items-center gap-2 opacity-50">
                            <span>Powered by Bhuvan Sai</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PromptResult;
