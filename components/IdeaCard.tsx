
import React, { useState } from 'react';
import { Idea } from '../types';
import { TargetIcon } from './icons/TargetIcon';
import { CodeIcon } from './icons/CodeIcon';
import { DollarSignIcon } from './icons/DollarSignIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { TrophyIcon } from './icons/TrophyIcon';
import { BrainCircuitIcon } from './icons/BrainCircuitIcon';
import { ThumbsUpIcon } from './icons/ThumbsUpIcon';
import { ThumbsDownIcon } from './icons/ThumbsDownIcon';

interface IdeaCardProps {
  idea: Idea;
}

const Stat: React.FC<{ value: string | number; label: string; color: string }> = ({ value, label, color }) => (
    <div className="text-center">
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
        <p className="text-xs text-slate-400">{label}</p>
    </div>
);

const DetailSection: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode;}> = ({ icon, title, children }) => (
    <div className="mt-4">
        <h4 className="flex items-center text-sm font-semibold text-slate-300">
            {icon}
            <span className="ml-2">{title}</span>
        </h4>
        <div className="mt-2 text-slate-400 text-sm pl-6">{children}</div>
    </div>
);

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

    const scoreColor = idea.marketValidationScore > 75 ? 'text-green-400' : idea.marketValidationScore > 50 ? 'text-yellow-400' : 'text-red-400';

    const handleFeedback = (newFeedback: 'up' | 'down') => {
      setFeedback(current => (current === newFeedback ? null : newFeedback));
    };

    return (
        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-xl p-6 flex flex-col transition-all duration-300 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-900/50">
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-blue-400">{idea.name}</h3>
                <p className="text-sm text-slate-400 mt-1 italic">"{idea.tagline}"</p>
                
                <div className="flex justify-around items-center my-4 p-3 bg-slate-900/50 rounded-lg">
                    <Stat value={idea.marketValidationScore} label="Validation Score" color={scoreColor} />
                    <Stat value={idea.difficultyLevel} label="Difficulty (1-10)" color="text-slate-300" />
                    <Stat value={`${idea.estimatedTimeToMvp}w`} label="MVP Time" color="text-slate-300" />
                </div>
                
                <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {idea.description}
                </p>

                {isExpanded && (
                    <div className="mt-4 animate-fade-in">
                        <DetailSection icon={<TargetIcon />} title="Target Market & Problem">
                            <p><strong>Audience:</strong> {idea.targetMarket}</p>
                            <p><strong>Problem:</strong> {idea.problemSolved}</p>
                        </DetailSection>
                        <DetailSection icon={<BrainCircuitIcon />} title="Key Features">
                            <ul className="list-disc list-inside">
                                {idea.keyFeatures.map((f, i) => <li key={i}>{f}</li>)}
                            </ul>
                        </DetailSection>
                        <DetailSection icon={<CodeIcon />} title="Tech Stack">
                            <div className="flex flex-wrap gap-2 mt-1">
                                {idea.techStack.map((t, i) => <span key={i} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">{t}</span>)}
                            </div>
                        </DetailSection>
                         <DetailSection icon={<DollarSignIcon />} title="Revenue Model">
                            <p>{idea.revenueModel}</p>
                        </DetailSection>
                        <DetailSection icon={<TrophyIcon />} title="Competitive Advantage">
                            <p>{idea.competitiveAdvantage}</p>
                        </DetailSection>
                    </div>
                )}
            </div>
            
            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={() => handleFeedback('up')} 
                        className="p-2 rounded-full transition-colors duration-200 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600"
                        aria-label="Good idea"
                    >
                        <ThumbsUpIcon className={`h-5 w-5 transition-colors ${feedback === 'up' ? 'text-green-400' : 'text-slate-500 hover:text-slate-300'}`} />
                    </button>
                    <button 
                        onClick={() => handleFeedback('down')} 
                        className="p-2 rounded-full transition-colors duration-200 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600"
                        aria-label="Bad idea"
                    >
                        <ThumbsDownIcon className={`h-5 w-5 transition-colors ${feedback === 'down' ? 'text-red-400' : 'text-slate-500 hover:text-slate-300'}`} />
                    </button>
                </div>
                <button 
                    onClick={() => setIsExpanded(!isExpanded)} 
                    className="text-sm text-blue-400 hover:text-blue-300 font-semibold flex items-center justify-center"
                >
                    {isExpanded ? 'Show Less' : 'Show More'}
                    <ChevronDownIcon className={`ml-1 h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
            </div>
        </div>
    );
};
