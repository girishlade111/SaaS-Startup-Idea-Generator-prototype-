import React, { useState } from 'react';
import { IdeaFormData } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';
import { CopyIcon } from './icons/CopyIcon';

interface MediaResultsProps {
  images: string[];
  videoUrl: string | null;
  onBack: () => void;
  formData: IdeaFormData | null;
}

export const MediaResults: React.FC<MediaResultsProps> = ({ images, videoUrl, onBack, formData }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleDownloadCSV = () => {
    if (!formData) return;
    
    const headers = ['Industry', 'Target Audience', 'Tech Stack', 'Monetization', 'Complexity', 'Video URL', 'Image 1 URL', 'Image 2 URL', 'Image 3 URL', 'Image 4 URL'];
    const data = [
      formData.industry,
      formData.audience,
      formData.stack,
      formData.monetization,
      formData.complexity,
      videoUrl || 'N/A',
      ...images
    ];

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + data.map(d => `"${d}"`).join(",");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "startup_idea_assets.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyToClipboard = () => {
    if (!formData) return;

    const textToCopy = `
# Startup Idea Assets

## Generation Parameters
- Industry: ${formData.industry}
- Target Audience: ${formData.audience}
- Tech Stack: ${formData.stack}
- Monetization: ${formData.monetization}
- Complexity: ${formData.complexity}

## Generated Media
- Video URL: ${videoUrl || 'N/A'}
- Image 1 URL: ${images[0] || 'N/A'}
- Image 2 URL: ${images[1] || 'N/A'}
- Image 3 URL: ${images[2] || 'N/A'}
- Image 4 URL: ${images[3] || 'N/A'}
    `.trim();

    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
        <button
            onClick={onBack}
            className="mb-8 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Generate New Assets
        </button>

        <div className="space-y-12">
            {videoUrl && (
                <section>
                    <h2 className="text-2xl font-bold text-slate-100 mb-4">Generated Concept Video</h2>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
                        <video 
                            src={videoUrl} 
                            controls 
                            autoPlay
                            loop
                            muted
                            className="w-full aspect-video"
                        />
                    </div>
                </section>
            )}

            {images.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-slate-100 mb-4">Generated Concept Images</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {images.map((imgSrc, index) => (
                            <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden shadow-lg aspect-video">
                                <img 
                                    src={imgSrc} 
                                    alt={`Generated startup concept image ${index + 1}`} 
                                    className="w-full h-full object-cover" 
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {formData && (
              <section>
                <h2 className="text-2xl font-bold text-slate-100 mb-4">Export Options</h2>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleDownloadCSV}
                    className="flex-1 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/50 font-semibold py-3 px-5 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <DownloadIcon />
                    Download as CSV (for Sheets/Notion)
                  </button>
                  <button 
                    onClick={handleCopyToClipboard}
                    className="flex-1 bg-sky-600/20 hover:bg-sky-600/40 text-sky-300 border border-sky-500/50 font-semibold py-3 px-5 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <CopyIcon />
                    {isCopied ? 'Copied!' : 'Copy Data to Clipboard'}
                  </button>
                </div>
              </section>
            )}
        </div>
    </div>
  );
};