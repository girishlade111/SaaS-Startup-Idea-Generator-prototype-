import React from 'react';
import { RocketIcon } from './icons/RocketIcon';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-12">
      <div className="inline-flex items-center justify-center bg-blue-500/10 text-blue-400 p-4 rounded-full mb-4">
        <RocketIcon className="h-8 w-8" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
        AI SaaS Startup Idea Generator
      </h1>
      <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
        Fuel your entrepreneurial journey with AI-generated concept videos and images.
      </p>
    </header>
  );
};
