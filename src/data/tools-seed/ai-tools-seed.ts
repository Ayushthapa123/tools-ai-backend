import { aiToolsWithProductType } from './product-type';

const foundationModels = [
  'GPT-4o', // 2024, multimodal, ChatGPT default
  'GPT-4 Turbo', // 2023, cheaper & faster GPT-4 variant
  'GPT-5', // 2025, OpenAI flagship
  'GPT-4 Mini', // Lightweight GPT variant

  'Claude 3.5 Sonnet', // 2024, Anthropic’s best all-rounder
  'Claude 3 Opus', // 2024, Anthropic’s reasoning model
  'Claude 3 Haiku', // 2024, lightweight, fast model

  'Gemini 1.5 Pro', // 2024, Google’s reasoning Gemini
  'Gemini 1.5 Flash', // 2024, fast & cost-efficient Gemini
  'Gemini Ultra', // Google’s top-tier flagship (rumored successor to 1.5)

  'Mistral Large', // 2024, strong open-weight + API model
  'Mixtral 8x7B', // 2023, MoE model (open-weight)

  'Llama 3 70B', // 2024, Meta’s strongest open-weight
  'Llama 3 8B', // 2024, smaller open-weight for light tasks

  'Command R+', // 2024, Cohere’s retrieval-augmented model
  'Command R', // Cohere’s reasoning-focused LLM

  'Grok-1', // 2023, xAI’s open-weight LLM
  'DeepSeek LLM 67B', // 2024, Chinese open-weight competitor

  'Yi-34B', // 2023, strong open-weight Chinese model
  'Qwen-72B', // 2024, Alibaba’s large open-weight model
  'Qwen-14B', // Smaller version of Qwen family
];

// 🔥 Most Popular AI Models (2024–2025)
const popularAiTools = [
  // --- Foundation Models ---
  'GPT-4o', // 2024, multimodal, ChatGPT default
  'GPT-4 Turbo', // 2023, cheaper & faster GPT-4 variant
  'GPT-5', // 2025, OpenAI flagship
  'Claude 3.5 Sonnet', // 2024, Anthropic’s best general-purpose model
  'Claude 3 Opus', // 2024, Anthropic’s reasoning model
  'Gemini 1.5 Pro', // 2024, Google’s reasoning Gemini
  'Gemini 1.5 Flash', // 2024, fast & cost-efficient Gemini
  'Mistral Large', // 2024, open weights + API
  'Llama 3 70B', // 2024, Meta’s strongest open-weight model

  // --- AI Assistants / Chatbots ---
  'ChatGPT', // OpenAI’s flagship product (powered by GPT models)
  'Claude AI', // Anthropic’s chatbot interface
  'Perplexity AI', // 2023-24, conversational search engine
  'Gemini (App)', // Google’s AI assistant replacing Bard
  'Copilot (Microsoft)', // AI assistant integrated into Office + Windows
  'Pi (Inflection)', // 2023, personal AI assistant

  // --- AI Code Tools ---
  'GitHub Copilot', // AI pair programmer
  'Replit Ghostwriter', // AI coding assistant
  'Codeium', // Free AI coding assistant
  'Tabnine', // Code completion AI

  // --- AI Writing / Productivity ---
  'Jasper', // AI marketing & copywriting assistant
  'Copy.ai', // AI tool for social & ad copy
  'Notion AI', // AI features inside Notion
  'GrammarlyGO', // AI writing enhancement
  'Writesonic', // AI writing + chat + images
  'QuillBot', // Paraphrasing & grammar AI

  // --- AI Image / Video ---
  'MidJourney', // AI art generation (Discord-based)
  'Stable Diffusion', // Open-weight image generation model
  'DALL·E 3', // OpenAI’s image generator
  'Runway Gen-2', // Text-to-video generation
  'Pika Labs', // AI video generation
  'Leonardo AI', // AI art + assets for games/design

  // --- AI Voice / Audio ---
  'ElevenLabs', // 2023, leading AI voice generation
  'Descript', // Podcast/video editing + voice cloning
  'Krisp', // AI noise cancellation for meetings
  'Speechify', // AI text-to-speech
  'Voicemod AI', // Real-time AI voice changer

  // --- AI Search / Knowledge ---
  'You.com', // AI-powered search engine
  'Phind', // AI for developers (search + answers)
  'SciSpace', // AI for research paper explanations
  'Elicit', // AI research assistant
];

// 🎓 Student & Education Tools
const studentAiTools = [
  'Pi (Inflection)', // Conversational tutor
  'Perplexity AI Pro', // Research-focused Q&A w/ sources
  'ChatGPT Edu', // Affordable student/university plan
  'Socratic by Google', // Step-by-step problem solving
  'DeepSeek Coder', // Coding-focused AI for students
  'Elicit', // Academic research assistant
  'TutorAI', // Personalized AI tutoring
  'QuillBot', // Paraphrasing & grammar helper
  'Explainpaper', // Simplifies research papers

  // --- More helpful AI tools for students ---
  'Khanmigo (Khan Academy)', // AI tutor integrated into Khan Academy
  'Wolfram Alpha', // Computational problem solver
  'GrammarlyGO', // Writing + grammar assistance
  'Notion AI', // Study organization + summarization
  'Otter.ai', // AI lecture transcription & note-taking
  'Caktus AI', // Homework & essay helper
  'Scribbr AI', // Citation & plagiarism checker
  'CourseHero AI', // Study guides & Q&A
  'ChatPDF', // Chat with textbooks/research PDFs
  'Glasp', // AI-powered study notes & highlights
  'Scholarcy', // Summarizes academic papers
  'SciSpace', // Research paper explanations
  'Jenni AI', // AI essay & research writing tool
  'Mindgrasp', // AI note-taker & explainer
];

// 📢 Marketing & Content Tools
const marketingAiTools = [
  'Jasper AI', // Copywriting & ad content
  'Copy.ai', // Content automation
  'Writesonic (Chatsonic)', // SEO + content generation
  'Surfer AI', // Blog writing + SEO
  'MarketMuse', // Content strategy & research
  'Anyword', // Predictive ad copy
  'Neuroflash', // Branding + marketing copy
  'INK for All', // SEO-focused writing
  'Frase.io', // Content briefs + optimization

  // --- More popular marketing tools ---
  'HubSpot AI', // AI CRM + content marketing features
  'Semrush AI', // SEO + keyword research + content marketing
  'GrammarlyGO', // Marketing copy refinement
  'Canva Magic Write', // AI for design captions & visuals
  'AdCreative.ai', // AI ad creatives for social & display
  'Writesonic’s Botsonic', // AI chatbot for customer engagement
  'Ocoya', // Social media post generation & scheduling
  'Predis.ai', // AI for Instagram/TikTok posts
  'LatelyAI', // Repurposes long-form into social media content
  'Wordtune', // Rewrite & polish marketing content
  'Scalenut', // AI for SEO content + keyword strategy
  'CopySmith', // AI e-commerce product descriptions
  'Rytr', // Affordable AI writing tool for marketers
  'Content at Scale', // Long-form SEO blog generator
  'StoryChief', // Content collaboration + AI
];

// 💼 Business & Productivity Tools
const businessOwnerAiTools = [
  'Cohere Command R+', // RAG + reasoning for business
  'Writer Enterprise', // Brand-safe enterprise AI
  'xAI Grok (Premium)', // Market insights / Elon’s xAI
  'Otter.ai', // Meeting notes & summaries
  'Fireflies.ai', // Meeting transcription/workflows
  'Notion AI', // Productivity + docs
  'Zoom AI Companion', // AI inside Zoom
  'Kore.ai', // Customer service automation
  'Forethought AI', // AI helpdesk automation

  // --- More popular business AI tools ---
  'Salesforce Einstein GPT', // AI CRM & business intelligence
  'HubSpot AI', // AI CRM + marketing automation
  'Zoho Zia', // AI assistant for CRM & analytics
  'Gong.io', // AI for sales call insights
  'Chorus.ai', // Sales coaching + call analytics
  'Clari AI', // Revenue forecasting & pipeline AI
  'x.ai (Calendar)', // AI scheduling assistant
  'Motion AI', // AI for calendar & project planning
  'Trello AI', // AI productivity & task management
  'ClickUp AI', // AI project management
  'Slack GPT', // AI inside Slack for workflows
  'Microsoft Copilot', // AI across Office & Teams
  'Google Duet AI', // AI across Google Workspace
  'Kuki AI', // Customer interaction automation
  'Intercom Fin AI', // AI customer support + chatbots
  'Drift', // AI marketing + conversational sales
  'Tidio AI', // Chatbots for small businesses
  'ChatSpot (HubSpot)', // Conversational CRM AI
  'Paddle AI', // AI for SaaS payments & revenue growth
  'QuickBooks AI', // AI for accounting & financial automation
  'Xero AI', // AI-powered accounting assistant
];

// Combine all
const aiTools = [
  ...foundationModels,
  ...popularAiTools,
  ...studentAiTools,
  ...marketingAiTools,
  ...businessOwnerAiTools,
  ...aiToolsWithProductType,
];

export {
  popularAiTools,
  studentAiTools,
  marketingAiTools,
  businessOwnerAiTools,
  aiTools,
};
