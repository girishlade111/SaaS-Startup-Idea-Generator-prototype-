import { GoogleGenAI, Modality } from "@google/genai";
import { IdeaFormData } from '../types';

// This function generates images based on the startup idea form data.
export const generateStartupImages = async (formData: IdeaFormData): Promise<string[]> => {
  // Create a new GoogleGenAI instance for each call to ensure the latest API key is used.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const { industry, audience } = formData;
  
  const prompt = `Generate 4 distinct, visually appealing images for a website hero section. The website is for a SaaS startup in the '${industry}' industry, targeting '${audience}'. The images should evoke themes of innovation, technology, and success. The style should be modern, professional, and abstract. Do not include any text in the images.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const images: string[] = [];
    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64ImageBytes: string = part.inlineData.data;
          const imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
          images.push(imageUrl);
        }
      }
    }

    if (images.length === 0) {
      throw new Error("The model did not return any images.");
    }
    
    return images;

  } catch (error) {
    console.error("Error generating startup images:", error);
    // Propagate the original error to allow for specific handling in the UI
    throw error;
  }
};

// This function generates a video based on the startup idea form data.
export const generateStartupVideo = async (formData: IdeaFormData, onStatusUpdate: (status: string) => void): Promise<string> => {
  // Create a new GoogleGenAI instance for each call to ensure the latest API key is used.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const { industry, audience } = formData;

  const prompt = `A short, 3-5 second dynamic promotional video for a new SaaS product in the '${industry}' space, targeting '${audience}'. Show abstract scenes of collaboration, data visualization, and user success. The style should be cinematic, tech-oriented, and optimistic.`;

  try {
    onStatusUpdate("Initializing video generation...");
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9',
      }
    });

    onStatusUpdate("Generating video... This can take a couple of minutes.");
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    onStatusUpdate("Finalizing and fetching video...");
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) {
        throw new Error("Video generation completed, but no download link was found.");
    }

    // The API key is required to download the video.
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY is not available to download the video.");
    }
    
    const videoResponse = await fetch(`${downloadLink}&key=${apiKey}`);
    if (!videoResponse.ok) {
        throw new Error(`Failed to download video. Status: ${videoResponse.statusText}`);
    }

    const videoBlob = await videoResponse.blob();
    return URL.createObjectURL(videoBlob);

  } catch (error) {
    console.error("Error generating startup video:", error);
    // Propagate the original error to allow for specific handling in the UI
    throw error;
  }
};