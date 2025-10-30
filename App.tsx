import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { IdeaForm } from './components/IdeaForm';
import { LoadingSpinner } from './components/icons/LoadingSpinner';
import { IdeaFormData } from './types';
import { generateStartupImages, generateStartupVideo } from './services/geminiService';
import { MediaResults } from './components/MediaResults';
import { SelectKeyPrompt } from './components/SelectKeyPrompt';

function App() {
  const [images, setImages] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoStatus, setVideoStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isKeyReady, setIsKeyReady] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [currentFormData, setCurrentFormData] = useState<IdeaFormData | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio && await window.aistudio.hasSelectedApiKey()) {
        setIsKeyReady(true);
      }
    };
    checkKey();
  }, []);

  const handleGenerate = async (formData: IdeaFormData) => {
    setIsLoading(true);
    setError(null);
    setImages([]);
    setVideoUrl(null);
    setCurrentFormData(formData);
    setShowResults(true);

    try {
      // Generate images and video in parallel
      const imagePromise = generateStartupImages(formData);
      const videoPromise = generateStartupVideo(formData, setVideoStatus).then(url => {
          setVideoUrl(url);
          setVideoStatus(null);
      });
      
      const [generatedImages] = await Promise.all([imagePromise, videoPromise]);
      setImages(generatedImages);

    } catch (err: any) {
      let errorMessage = err.message || "An unexpected error occurred.";
      
      // Refined API Key Error Handling
      if (err.message && err.message.includes("Requested entity was not found")) {
        // This specific error message from the API often indicates an invalid API key.
        // We provide a more user-friendly message and reset the state to prompt for a new key.
        errorMessage = "There was a problem with your API key. It may be invalid, expired, or lack the necessary permissions. Please select a different key and try again.";
        setIsKeyReady(false); // Force re-selection of the key.
        setShowResults(false); // Hide the results/loading screen.
      } else if (errorMessage.includes("did not return any images")) {
        errorMessage = "The AI couldn't generate images based on your inputs. Try rephrasing your industry or target audience for better results.";
      } else if (errorMessage.includes("no download link was found")) {
        errorMessage = "Video generation was successful, but the final video file could not be retrieved. This might be a temporary issue. Please try again.";
      } else if (errorMessage.includes("Failed to download video")) {
        errorMessage = "There was a problem downloading the generated video. Please check your internet connection and try again.";
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setVideoStatus(null);
    }
  };
  
  const WelcomeMessage = () => (
    <div className="text-center p-8 bg-slate-800/50 rounded-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-400 mb-2">Welcome to the SaaS Idea Generator</h2>
      <p className="text-slate-300">
        Fill out the form above to generate AI-powered images and a concept video for your next big startup idea.
      </p>
    </div>
  );

  const handleBackToForm = () => {
    setShowResults(false);
    setImages([]);
    setVideoUrl(null);
    setError(null);
    setCurrentFormData(null);
  }
  
  const handleKeySelected = () => {
    setIsKeyReady(true);
    setError(null); // Clear any previous API key errors after a new key is selected.
  }

  const renderContent = () => {
    if (showResults) {
      if (isLoading || videoStatus) {
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <LoadingSpinner />
            <p className="mt-4 text-lg text-slate-300 animate-pulse">Generating media assets...</p>
            {videoStatus && <p className="text-sm text-slate-400 mt-2">{videoStatus}</p>}
            <p className="text-sm text-slate-400">This might take a few minutes, especially for video.</p>
          </div>
        )
      }
      if (error) {
         return (
          <div className="text-center p-6 bg-red-900/50 border border-red-700 text-red-300 rounded-lg max-w-2xl mx-auto">
            <p className="font-bold">An Error Occurred</p>
            <p className="mt-2 text-sm">{error}</p>
            <button onClick={handleBackToForm} className="mt-4 bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              Try Again
            </button>
          </div>
        )
      }
      if (images.length > 0 || videoUrl) {
        return <MediaResults images={images} videoUrl={videoUrl} onBack={handleBackToForm} formData={currentFormData} />
      }
    }
    
    return (
      <>
        <IdeaForm onGenerate={handleGenerate} isLoading={isLoading} />
        <div className="mt-12">
            {!isLoading && <WelcomeMessage />}
        </div>
      </>
    )
  }

  if (!isKeyReady) {
    return (
      <div className="relative z-10 container mx-auto px-4 py-8">
        <SelectKeyPrompt onKeySelected={handleKeySelected} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 bg-grid-slate-700/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-slate-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Header />
        <main>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
