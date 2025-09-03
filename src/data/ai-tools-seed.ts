// 30 for each user type
// 30 for each domain
// 30 for each ai type
// 30 for each modality

const generalAiTools = [
  'GPT-4o', // 2024, multimodal, ChatGPT default
  'GPT-4 Turbo', // 2023, cheaper & faster GPT-4 variant
  'GPT-5', // 2025, next-gen OpenAI flagship
  'Claude 3.5 Sonnet', // 2024, Anthropic’s top model
  'Claude 3 Opus', // 2024, Anthropic’s reasoning model
  'Gemini 1.5 Flash', // 2024, faster/cheaper Gemini variant
  'Mistral Large', // 2024, open weights + API model
  'Llama 3 70B', // 2024, Meta’s strongest open-weight model

  'Gemini 1.5 Pro', // Google’s reasoning-oriented Gemini
  'Claude 3 Haiku', // Lightweight, fast Anthropic model
  'GPT-4 Mini', // Cheaper lightweight GPT variant
  'Llama 3 8B', // Smaller open-weight model for lighter tasks
];

const studentAiTools = [
  'Pi (Inflection)', // Conversational tutor, friendly for Q&A
  'Perplexity AI Pro', // Research-focused, sources included
  'ChatGPT Edu', // Affordable access for universities/students
  'Socratic by Google', // Step-by-step learning, problem explanations
  'DeepSeek Coder', // Coding-focused model, great for CS students

  'Elicit', // AI for academic research & literature reviews
  'TutorAI', // Personalized tutoring with explanations
  'QuillBot', // Paraphrasing & grammar for essays
  'Explainpaper', // Simplifies research papers for students
];

const marketingAiTools = [
  'Jasper AI', // Specialized in ad copy, social posts
  'Copy.ai', // Content automation for marketing teams
  'Writesonic (Chatsonic)', // SEO + marketing content generation
  'Surfer AI', // Blog writing + SEO optimization
  'MarketMuse', // Marketing research + long-form content

  'Anyword', // Predictive copywriting with performance scoring
  'Neuroflash', // Marketing copy + branding support
  'INK for All', // SEO-focused AI writer
  'Frase.io', // AI content briefs + optimization
];

const businessOwnerAiTools = [
  'Cohere Command R+', // Business reasoning, retrieval-augmented
  'Writer Enterprise', // Brand-safe AI for internal docs & marketing
  'xAI Grok (premium)', // Market insights, Elon’s business-focused model
  'Otter.ai', // Meeting summaries & team productivity
  'Fireflies.ai', // Business meeting notes + workflows

  'Notion AI', // Productivity & business knowledge management
  'Zoom AI Companion', // AI integrated into Zoom meetings
  'Kore.ai', // AI-powered customer service & business automation
  'Forethought AI', // AI helpdesk + customer support automation
];

const aiTools = [
  ...generalAiTools,
  ...studentAiTools,
  ...marketingAiTools,
  ...businessOwnerAiTools,
];

export default aiTools;
