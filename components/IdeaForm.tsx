import React, { useState } from 'react';
import { IdeaFormData } from '../types';

interface IdeaFormProps {
  onGenerate: (formData: IdeaFormData) => void;
  isLoading: boolean;
}

const InputField: React.FC<{ label: string } & React.ComponentPropsWithoutRef<'input'>> = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
        <input 
            type="text" 
            {...props}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
    </div>
);

const SelectField: React.FC<{ label: string } & React.ComponentPropsWithoutRef<'select'>> = ({ label, children, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
        <select 
            {...props}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition appearance-none"
        >
            {children}
        </select>
    </div>
);


export const IdeaForm: React.FC<IdeaFormProps> = ({ onGenerate, isLoading }) => {
  const [formData, setFormData] = useState<IdeaFormData>({
    industry: 'Healthcare',
    audience: 'Small Businesses',
    stack: 'React + Node.js',
    monetization: 'Subscription',
    complexity: 'Medium',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField 
            label="Industry" 
            name="industry"
            value={formData.industry} 
            onChange={handleChange}
            placeholder="e.g., E-commerce, FinTech"
          />
          <InputField 
            label="Target Audience" 
            name="audience"
            value={formData.audience} 
            onChange={handleChange}
            placeholder="e.g., Developers, Marketers"
          />
          <InputField 
            label="Tech Stack Preference" 
            name="stack"
            value={formData.stack} 
            onChange={handleChange}
            placeholder="e.g., Python, serverless"
          />
          <SelectField label="Monetization Model" name="monetization" value={formData.monetization} onChange={handleChange}>
            <option>Subscription</option>
            <option>Freemium</option>
            <option>Pay-per-use</option>
            <option>Marketplace</option>
          </SelectField>
          <SelectField label="Business Complexity" name="complexity" value={formData.complexity} onChange={handleChange}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </SelectField>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          {isLoading ? 'Generating...' : 'Generate My Startup Idea'}
        </button>
      </form>
    </div>
  );
};