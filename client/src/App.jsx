import React, { useState } from 'react';
import PromptInput from './components/PromptInput';
import PromptResult from './components/PromptResult';

function App() {
    const [optimizedPrompt, setOptimizedPrompt] = useState('');

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary/30 relative overflow-hidden font-sans">
            {/* Background Gradients */}
            <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-secondary/20 rounded-full blur-[150px] pointer-events-none" />

            {/* Noise Texture */}
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

            <div className="container mx-auto px-4 py-16 relative z-10 flex flex-col items-center">
                <header className="mb-16 text-center">
                    <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-white mb-6 tracking-tighter drop-shadow-[0_0_15px_rgba(0,255,163,0.5)]">
                        UniPrompt
                    </h1>
                    <p className="text-xl text-gray-400 max-w-lg mx-auto font-light tracking-wide">
                        Transform raw ideas into <span className="text-primary font-medium">precision-engineered</span> prompts.
                    </p>
                </header>

                <main className="w-full">
                    <PromptInput setOptimizedPrompt={setOptimizedPrompt} />
                    <PromptResult optimizedPrompt={optimizedPrompt} />
                </main>
            </div>
        </div>
    );
}

export default App;
