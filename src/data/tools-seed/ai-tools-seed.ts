import { aiToolsWithProductType } from './product-type';
import { aiToolsWithAiType } from './ai-type';

const foundationModels = [
  'Gemini 1.5 ', // 2024, fast & cost-efficient Gemini
  'Gemini Ultra', // Google’s top-tier flagship (rumored successor to 1.5)

  'Mixtral 8x7B', // 2023, MoE model (open-weight)

  'Command R+', // 2024, Cohere’s retrieval-augmented model
  'Command R', // Cohere’s reasoning-focused LLM

  'Grok-1', // 2023, xAI’s open-weight LLM
  'DeepSeek LLM 67B', // 2024, Chinese open-weight competitor

  'Yi-34B', // 2023, strong open-weight Chinese model
  'Qwen-72B', // 2024, Alibaba’s large open-weight model
  'Qwen-14B', // Smaller version of Qwen family
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
  // ...foundationModels,
  // ...studentAiTools,
  // ...marketingAiTools,
  // ...businessOwnerAiTools,
  // product type wise. done
  ...aiToolsWithProductType,
  // ai type wise.  done
  // ...aiToolsWithAiType,
];

export { studentAiTools, marketingAiTools, businessOwnerAiTools, aiTools };
