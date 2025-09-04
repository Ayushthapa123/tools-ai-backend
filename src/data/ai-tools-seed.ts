const foundationModels = [
  'GPT-4o', // 2024, multimodal, ChatGPT default
  // 'GPT-4 Turbo', // 2023, cheaper & faster GPT-4 variant
  // 'GPT-5', // 2025, OpenAI flagship
  // 'Claude 3.5 Sonnet', // 2024, Anthropic’s best all-rounder
  // 'Claude 3 Opus', // 2024, Anthropic’s reasoning model
  // 'Claude 3 Haiku', // 2024, lightweight, fast model
  // 'Gemini 1.5 Pro', // 2024, Google’s reasoning Gemini
  // 'Gemini 1.5 Flash', // 2024, fast & cost-efficient Gemini
  // 'Mistral Large', // 2024, strong open-weight + API model
  // 'Llama 3 70B', // 2024, Meta’s strongest open-weight
  // 'Llama 3 8B', // 2024, smaller open-weight for light tasks
  // 'GPT-4 Mini', // Lightweight GPT variant
];

// 🔥 Most Popular AI Models (2024–2025)
const popularAiTools = [
  'GPT-4o', // 2024, multimodal, ChatGPT default
  'GPT-4 Turbo', // 2023, cheaper & faster GPT-4 variant
  'GPT-5', // 2025, OpenAI flagship
  'Claude 3.5 Sonnet', // 2024, Anthropic’s best general-purpose model
  'Claude 3 Opus', // 2024, Anthropic’s reasoning model
  'Gemini 1.5 Pro', // 2024, Google’s reasoning Gemini
  'Gemini 1.5 Flash', // 2024, fast & cost-efficient Gemini
  'Mistral Large', // 2024, open weights + API
  'Llama 3 70B', // 2024, Meta’s strongest open-weight model
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
];

// Combine all
const aiTools = [
  ...foundationModels,
  // ...popularAiTools,
  // ...studentAiTools,
  // ...marketingAiTools,
  // ...businessOwnerAiTools,
];

export {
  popularAiTools,
  studentAiTools,
  marketingAiTools,
  businessOwnerAiTools,
  aiTools,
};
