import React from 'react';

interface SelectKeyPromptProps {
    onKeySelected: () => void;
}

export const SelectKeyPrompt: React.FC<SelectKeyPromptProps> = ({ onKeySelected }) => {

    const handleSelectKey = async () => {
        try {
            await window.aistudio.openSelectKey();
            // Optimistically assume the user selected a key and update the state.
            onKeySelected();
        } catch (error) {
            console.error("Error opening select key dialog:", error);
        }
    }

    return (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-80 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-lg text-center shadow-2xl">
                <h2 className="text-2xl font-bold text-blue-400 mb-4">API Key Required for Video Generation</h2>
                <p className="text-slate-300 mb-6">
                    Generating videos with the Veo model requires a Google AI API key. Please select a key to proceed. Using this feature may incur costs on your Google Cloud project.
                </p>
                <p className="text-sm text-slate-400 mb-6">
                    For more details, please see the <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">billing documentation</a>.
                </p>
                <button
                    onClick={handleSelectKey}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                    Select API Key
                </button>
            </div>
        </div>
    );
};
