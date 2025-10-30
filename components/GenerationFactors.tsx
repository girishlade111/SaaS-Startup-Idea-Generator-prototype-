import React from 'react';

const FactorDetail: React.FC<{ category: string; children: React.ReactNode }> = ({ category, children }) => (
    <p className="mt-2 text-sm">
        <strong className="text-slate-300 font-semibold">{category}:</strong>
        <span className="ml-2 text-slate-400">{children}</span>
    </p>
);

const FactorCard: React.FC<{ number: number; title: string; description: string; children: React.ReactNode }> = ({ number, title, description, children }) => (
    <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-xl p-6 mb-6 transition-all hover:border-blue-600">
        <h3 className="text-lg font-bold text-blue-400 mb-2">
            {number}) {title}
        </h3>
        <p className="text-sm text-slate-400 mb-3 italic">
            {description}
        </p>
        <div className="border-t border-slate-700 pt-3">{children}</div>
    </div>
);

const CodeHighlight: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <code className="text-xs bg-slate-700 text-emerald-400 px-1.5 py-0.5 rounded-md font-mono">{children}</code>
);

export const GenerationFactors: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="max-w-5xl mx-auto animate-fade-in">
            <button
                onClick={onBack}
                className="mb-8 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to Generator
            </button>

            <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-slate-100">Main Factors for Generating Strong SaaS Ideas</h2>
                <p className="mt-4 text-slate-400 max-w-3xl mx-auto">
                    A compact, practical checklist of the main factors you should evaluate when building a SaaS startup idea generator that accepts and outputs text, video, images, plus web and real-time market signals.
                </p>
            </div>

            <FactorCard number={1} title="Problem clarity & pain intensity" description="What to measure: severity of the pain, frequency, willingness to pay.">
                <FactorDetail category="Text">User interviews, forum posts, support tickets — run topic modeling and sentiment analysis to surface recurring pains.</FactorDetail>
                <FactorDetail category="Video">Extract audio → ASR (speech-to-text) and analyze phrases/intonation that signal frustration or repeated complaints.</FactorDetail>
                <FactorDetail category="Image">Screenshots/photos of workflows, UI pain points → OCR + annotation detection to find broken UX patterns.</FactorDetail>
                <FactorDetail category="Web/Realtime data">Number of searches for problem keywords (search volume), help-forum threads, product reviews; rising queries indicate emerging pains.</FactorDetail>
            </FactorCard>

            <FactorCard number={2} title="Market size & growth (TAM / SAM / SOM)" description="What to measure: addressable market, growth rate, and momentum.">
                <FactorDetail category="Text">Scrape reports, blog posts, analyst quotes and extract numeric estimates.</FactorDetail>
                <FactorDetail category="Video">Conference talks and product demos can contain market claims; extract and summarize.</FactorDetail>
                <FactorDetail category="Image">Infographics and charts—use image OCR + table extraction to harvest numbers.</FactorDetail>
                <FactorDetail category="Web/Realtime data">Google Trends, job listings growth, public company filings, funding rounds — use these to compute growth trends.</FactorDetail>
            </FactorCard>

            <FactorCard number={3} title="Competitive landscape & differentiation" description="What to measure: direct competitors, substitute products, feature comparison, pricing.">
                <FactorDetail category="Text">Competitor sites, product docs, reviews — run competitor extraction and feature-matrix generation.</FactorDetail>
                <FactorDetail category="Video">Competitor demos and webinars reveal UX/feature gaps.</FactorDetail>
                <FactorDetail category="Image">Screenshots of competitor UIs for visual diffing.</FactorDetail>
                <FactorDetail category="Web/Realtime data">Brand mentions, sentiment, and new product launches; watch funding and hiring to spot aggressive entrants.</FactorDetail>
            </FactorCard>

            <FactorCard number={4} title="Feasibility / technical complexity" description="What to measure: required tech (ML, APIs, integrations), data availability, build time.">
                <FactorDetail category="Text">Analyze sample input prompts and required transformations to estimate engineering effort.</FactorDetail>
                <FactorDetail category="Video/Image">Evaluate compute/storage needs (video processing costs are higher), required model capabilities (vision + speech).</FactorDetail>
                <FactorDetail category="Web/Realtime data">Availability of public APIs, third-party data costs, and platform restrictions.</FactorDetail>
            </FactorCard>

            <FactorCard number={5} title="Monetization potential & pricing strategy" description="What to measure: ARPU, measurable value metric, expected conversion funnel.">
                <FactorDetail category="Text">Generate pricing experiments and unit-economics scenarios from case studies and comparable products.</FactorDetail>
                <FactorDetail category="Video/Image">Estimate perceived value for use-cases that are media-heavy (e.g., video editing SaaS can charge more).</FactorDetail>
                <FactorDetail category="Web/Realtime data">Competitor pricing pages, marketplace commission rates, and customer acquisition cost (CAC) signals.</FactorDetail>
            </FactorCard>

            <FactorCard number={6} title="Distribution & go-to-market channels" description="What to measure: lowest friction channels (SEO, integrations, marketplaces, direct sales).">
                <FactorDetail category="Text">Detect popular communities, Slack/Discord channels, and search intents.</FactorDetail>
                <FactorDetail category="Video">Identify creators and influencers who demo tools — potential partnerships.</FactorDetail>
                <FactorDetail category="Image">Virality potential (imageable features like shareable visuals).</FactorDetail>
                <FactorDetail category="Web/Realtime data">Ad keyword CPC, developer forum activity, marketplace visibility metrics.</FactorDetail>
            </FactorCard>

            <FactorCard number={7} title="Validation signals & early evidence" description="What to measure: minimum viable test results — signups, waitlist signups, paid trials.">
                <FactorDetail category="Text">Craft landing page copy + ads and monitor conversion copy tests.</FactorDetail>
                <FactorDetail category="Video/Image">Build short demo videos or sample images to validate user interest; track CTR.</FactorDetail>
                <FactorDetail category="Web/Realtime data">A/B test ad creatives; use search ad queries to validate demand fast.</FactorDetail>
            </FactorCard>

            <FactorCard number={8} title="Unit economics & runway impact" description="What to measure: LTV, CAC, gross margin, infrastructure costs (esp. for video/image processing).">
                <FactorDetail category="Text">Derive estimates from similar product case studies.</FactorDetail>
                <FactorDetail category="Video/Image">Factor bandwidth and GPU costs into per-user cost.</FactorDetail>
                <FactorDetail category="Web/Realtime data">Pricing of cloud compute, CDN and model inference costs from providers.</FactorDetail>
            </FactorCard>

            <FactorCard number={9} title="Legal, compliance & data safety" description="What to measure: GDPR, CCPA, IP rights (important when processing user images/videos), export controls.">
                <FactorDetail category="Text">Privacy policy extraction and mapping to required controls.</FactorDetail>
                <FactorDetail category="Video/Image">User consent flows for media, content ownership flags.</FactorDetail>
                <FactorDetail category="Web/Realtime data">Any regulatory changes or high-profile enforcement news to watch.</FactorDetail>
            </FactorCard>

            <FactorCard number={10} title="Timing & trend alignment" description="What to measure: is this idea riding a growing trend or a fading fad?">
                <FactorDetail category="Text/Video/Image">Sentiment and mention volume across formats.</FactorDetail>
                <FactorDetail category="Web/Realtime data">Google Trends, Twitter/X spikes, StackOverflow tags, recent funding/news events.</FactorDetail>
            </FactorCard>

            <FactorCard number={11} title="Multimodal input handling (how to use text / video / images)" description="Methods for processing diverse user inputs.">
                <FactorDetail category="Text inputs">Prompts, job-descriptions, interview transcripts, search phrases → embeddings + prompt templates.</FactorDetail>
                <FactorDetail category="Video inputs">Pipeline = video → keyframe extraction + ASR → text + images. Use scene detection to identify segments.</FactorDetail>
                <FactorDetail category="Image inputs">OCR, object detection, UI element extraction, color/brand detection, screenshot diffs.</FactorDetail>
                <FactorDetail category="Fusion">Create a shared embedding space (multimodal embeddings) so a search/query can match across text, image, and video.</FactorDetail>
            </FactorCard>

            <FactorCard number={12} title="Output types (how the generator should answer)" description="Potential outputs beyond simple text.">
                <FactorDetail category="Text outputs">Idea summary, market-fit rationale, 1-page pitch, validated metrics.</FactorDetail>
                <FactorDetail category="Video outputs">Short explainer video mockups (script + storyboard + keyframes), demo walkthroughs.</FactorDetail>
                <FactorDetail category="Image outputs">Mockup screenshots, logo ideas, simple UI thumbnails (using generative image models).</FactorDetail>
                <FactorDetail category="Web/Realtime enrichment">Attach live trend graphs, competitor snapshots, and domain availability inline.</FactorDetail>
            </FactorCard>

            <FactorCard number={13} title="Data sources & APIs to integrate (real-time & historical)" description="A list of valuable data sources for enrichment.">
                <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
                    <li><strong className="text-slate-300">Search & trends:</strong> Google Trends, Bing/Web search APIs</li>
                    <li><strong className="text-slate-300">Keyword volume & CPC:</strong> SEMrush, Ahrefs, Moz, Google Ads API</li>
                    <li><strong className="text-slate-300">Social listening:</strong> Twitter/X API, Reddit, public Discord/Slack monitoring via third-party APIs</li>
                    <li><strong className="text-slate-300">Funding & companies:</strong> Crunchbase, PitchBook, AngelList (where accessible)</li>
                    <li><strong className="text-slate-300">Job market signals:</strong> Indeed, LinkedIn job counts (indicates hiring momentum)</li>
                    <li><strong className="text-slate-300">App marketplaces:</strong> Product Hunt, App Store / Play Store data</li>
                    <li><strong className="text-slate-300">Patent & academic signals:</strong> Google Patents, arXiv</li>
                    <li><strong className="text-slate-300">Pricing & compute costs:</strong> Cloud provider APIs (AWS/GCP/Azure) for real-time cost estimates</li>
                </ul>
            </FactorCard>
            
            <FactorCard number={14} title="Scoring & ranking methodology (how to pick best ideas)" description="A framework for evaluating and prioritizing generated ideas.">
                 <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
                    <li>Combine normalized components: <CodeHighlight>Problem severity</CodeHighlight>, <CodeHighlight>Market growth</CodeHighlight>, <CodeHighlight>Competitive gap</CodeHighlight>, <CodeHighlight>Feasibility</CodeHighlight>, <CodeHighlight>Monetization score</CodeHighlight>.</li>
                    <li>Use weighted scoring with adjustable weights (allow user to prioritize e.g., low technical risk vs. high growth).</li>
                    <li>Provide confidence interval and show which inputs drove the score.</li>
                </ul>
            </FactorCard>
            
            <FactorCard number={15} title="UX considerations (modern, minimal, actionable)" description="Key design principles for the generator's user interface.">
                 <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
                    <li>Present ideas as compact cards (title, tagline, validation score, 1-line MOAT). Expand for details.</li>
                    <li>Allow multi-format previews: text summary, short storyboard (video), and mockup image.</li>
                    <li>Provide one-click actions: save, export (PDF/Notion/GSheets), create pitch deck, start a trial project.</li>
                    <li>Show real-time badges (e.g., “Trend +45% this month”, “Funding activity: 3 rounds last 6 months”).</li>
                </ul>
            </FactorCard>
            
            <FactorCard number={16} title="Experimentation & feedback loop" description="How to improve the generator over time.">
                 <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
                    <li>Track which suggestions users save/export/act on — use this as implicit feedback to fine-tune idea scoring.</li>
                    <li>A/B test prompt templates and output formats to see what converts to real projects.</li>
                </ul>
            </FactorCard>
            
            <FactorCard number={17} title="Practical implementation checklist (quick)" description="High-level steps to build this system.">
                <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
                    <li>Build ingestion pipelines for: web search, Google Trends, social mentions, job posts.</li>
                    <li>Create multimodal preprocessing (ASR, OCR, image feature extraction).</li>
                    <li>Design LLM prompts and templates for idea generation + validation reasoning.</li>
                    <li>Implement scoring engine with transparent weights.</li>
                    <li>Wire up UI that shows multimodal previews and real-time enrichment.</li>
                    <li>Add export/save, auth, and subscription controls.</li>
                </ul>
            </FactorCard>
            
            <FactorCard number={18} title="Quick example (how the generator might use inputs + realtime data)" description="A sample end-to-end flow.">
                <p className="text-slate-400 text-sm">
                    <strong className="text-slate-300">Input:</strong> “Industry = remote work tools; user uploaded a 2-min video of a frustrated manager; region = India; monetization = subscription.”<br/>
                    <strong className="text-slate-300">Processing:</strong> ASR → extract pain phrases (“no visibility on async work”); extract video frames showing spreadsheets; query Google Trends for “async work tools India”; fetch competitor list and job postings for “remote manager”.<br/>
                    <strong className="text-slate-300">Output:</strong> 5 ranked SaaS ideas with validation scores, required tech stack (collaboration + analytics), 30-sec demo storyboard, domain suggestions, and estimated MVP cost.
                </p>
            </FactorCard>
        </div>
    );
};
