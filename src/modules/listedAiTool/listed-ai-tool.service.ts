import { UpdateListedAiToolInput } from './dtos/update-listed-ai-tool.input';
import { Injectable } from '@nestjs/common';
// import { HostelData } from '@src/models/global.model';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateListedAiToolInput } from './dtos/create-listed-ai-tool.input';
import {
  ToolUserType,
  UserType,
  ListedBy,
  ProductType,
  AiType,
  AiCapability,
  Domain,
} from '@src/models/global.enum';
import { CookieService } from '../auth/services/cookie.service';
import { generateSlug } from '@src/helpers/generateSlug';
import { GoogleGenAI } from '@google/genai';
import { aiTools } from '@src/data/tools-seed/ai-tools-seed';
import { google } from 'googleapis';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

@Injectable()
export class ListedAiToolService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cookieService: CookieService,
  ) {}

  /**
   * Validates and normalizes video URLs
   * @param videoUrl - The video URL to validate
   * @returns Normalized URL or empty string if invalid
   */
  private validateVideoUrl(videoUrl: string): string {
    if (!videoUrl || typeof videoUrl !== 'string') {
      return '';
    }

    const trimmedUrl = videoUrl.trim();
    if (trimmedUrl === '') {
      return '';
    }

    try {
      const url = new URL(trimmedUrl);

      // Check if it's a supported video platform
      const supportedDomains = ['youtube.com', 'www.youtube.com'];

      const isSupported = supportedDomains.some(
        (domain) =>
          url.hostname === domain || url.hostname.endsWith('.' + domain),
      );

      if (!isSupported) {
        console.warn(`Unsupported video platform: ${url.hostname}`);
        return '';
      }

      return trimmedUrl;
    } catch (error) {
      console.warn(`Invalid video URL format: ${trimmedUrl}`);
      return '';
    }
  }

  async getAllListedAiTools(
    pageSize: number,
    pageNumber: number,
    isSuperAdmin: boolean,
  ) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    // superadmin should get all verified/non verified tools but other should get only verified
    const tools = await this.prisma.listedAiTool.findMany({
      skip,
      take,
      where: isSuperAdmin ? {} : { verified: true },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: tools,
      error: null,
    };
  }
  async getListedAiToolsWithHighPopularityScore(
    pageSize: number,
    pageNumber: number,
    isSuperAdmin: boolean,
  ) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    // superadmin should get all verified/non verified tools but other should get only verified
    const tools = await this.prisma.listedAiTool.findMany({
      skip,
      take,
      where: {
        popularityScore: {
          gt: 84,
        },
      },
      orderBy: {
        popularityScore: 'desc',
      },
    });
    console.log('toolsssssssssssssssssssss', tools);

    return {
      data: tools,
      error: null,
    };
  }

  async getListedAiToolsByProductType(
    pageSize: number,
    pageNumber: number,
    productType: ProductType,
  ) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    // superadmin should get all verified/non verified hostels but other should get only verified
    const tools = await this.prisma.listedAiTool.findMany({
      skip,
      take,
      where: {
        productType: {
          has: productType,
        },
      },
      orderBy: {
        popularityScore: 'desc',
      },
    });

    return {
      data: tools,
      error: null,
    };
  }

  async getListedAiToolsByUserType(
    pageSize: number,
    pageNumber: number,
    userType: ToolUserType,
  ) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    // superadmin should get all verified/non verified hostels but other should get only verified
    const tools = await this.prisma.listedAiTool.findMany({
      skip,
      take,
      where: {
        toolUserTypes: {
          has: userType,
        },
      },
      orderBy: {
        popularityScore: 'desc',
      },
    });

    return {
      data: tools,
      error: null,
    };
  }

  async getListedAiToolsByAiType(
    pageSize: number,
    pageNumber: number,
    aiType: AiType,
  ) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    // superadmin should get all verified/non verified hostels but other should get only verified
    const tools = await this.prisma.listedAiTool.findMany({
      skip,
      take,
      where: {
        aiType: {
          has: aiType,
        },
      },
      orderBy: {
        popularityScore: 'desc',
      },
    });

    return {
      data: tools,
      error: null,
    };
  }

  async getListedAiToolsByAiCapability(
    pageSize: number,
    pageNumber: number,
    aiCapability: AiCapability,
  ) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    // superadmin should get all verified/non verified hostels but other should get only verified
    const tools = await this.prisma.listedAiTool.findMany({
      skip,
      take,
      where: {
        aiCapabilities: {
          has: aiCapability,
        },
      },
      orderBy: {
        popularityScore: 'desc',
      },
    });

    return {
      data: tools,
      error: null,
    };
  }

  async getListedAiToolsByDomain(
    pageSize: number,
    pageNumber: number,
    domain: Domain,
  ) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    // superadmin should get all verified/non verified hostels but other should get only verified
    const tools = await this.prisma.listedAiTool.findMany({
      skip,
      take,
      where: {
        domains: {
          has: domain,
        },
      },
      orderBy: {
        popularityScore: 'desc',
      },
    });

    return {
      data: tools,
      error: null,
    };
  }

  async getListedAiToolsByUserId(
    pageSize: number,
    pageNumber: number,
    userId: number,
  ) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    // superadmin should get all verified/non verified hostels but other should get only verified
    // get in reverse order of createdAt
    const tools = await this.prisma.listedAiTool.findMany({
      where: {
        ownerId: userId,
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: tools,
      error: null,
    };
  }

  async getListedAiToolById(toolId: number) {
    const tool = await this.prisma.tool.findUnique({
      where: { id: toolId },
    });
    return {
      data: tool,
      error: null,
    };
  }

  async getListedAiToolBySlug(slug: string) {
    const tool = await this.prisma.listedAiTool.findUnique({
      where: { slug: slug },
    });
    return {
      data: tool,
      error: null,
    };
  }

  async getListedAiToolBytoken(toolId: number) {
    try {
      const tool = await this.prisma.listedAiTool.findFirst({
        where: { id: toolId },
      });
      return {
        data: tool,
        error: null,
      };
    } catch (error) {
      // Token verification failed
      return {
        data: null,
        error: {
          message: 'tool not found',
        },
      };
    }
  }

  async createListedAiTool(userId: number, data: CreateListedAiToolInput) {
    // generate slug from name
    const slug = generateSlug(data.name);
    // check if slug already exists
    try {
      const res = await this.prisma.listedAiTool.create({
        data: {
          ...data,
          ownerId: userId,
          slug: slug,
        },
      });
      return {
        data: res,
        error: null,
      };
    } catch (error) {
      console.error('Error in createListedAiTool:', error);
      return {
        data: null,
        error: {
          message: 'not allowed',
        },
      };
    }
  }

  async createListedAiToolAnonymously(data: CreateListedAiToolInput) {
    console.log('createListedAiToolAnonymously method called');
    const { ownerEmail, ...rest } = data;
    // find the user by email
    let user = await this.prisma.user.findUnique({
      where: {
        email: ownerEmail,
      },
    });
    if (!user) {
      // create a new user
      user = await this.prisma.user.create({
        data: {
          email: ownerEmail,
          fullName: 'Anonymous User',
          username: ownerEmail.split('@')[0],
        },
      });
    }
    const userId = user?.id;
    // generate slug from name
    const slug = generateSlug(data.name);
    // check if slug already exists
    try {
      const res = await this.prisma.listedAiTool.create({
        data: {
          ...rest,
          ownerId: userId,
          slug: slug,
        },
      });
      return {
        data: res,
        error: null,
      };
    } catch (error) {
      console.error('Error in createListedAiTool:', error);
      return {
        data: null,
        error: {
          message: 'not allowed',
        },
      };
    }
  }

  async createListedAiToolFromArray() {
    console.log('createListedAiToolFromArray method called');
    // list few ai tools for each usertype,domain, aitype, modality in data.ts file and get from there

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    try {
      for (const model of aiTools) {
        console.log(`Processing model: ${model}`);

        const modelInDb = await this.prisma.listedAiTool.findFirst({
          where: { name: model },
        });

        if (modelInDb?.name) {
          console.log(`${model} already in the database`);
          continue;
        }

        console.log(`${model} not in the database`);

        // Enhanced prompt for more accurate AI tool data generation
        const prompt = `
        You are an expert AI researcher and data analyst specializing in AI tools and models. Your task is to generate comprehensive, accurate data for the AI tool "${model}".

        🎯 PRIMARY OBJECTIVE: Create realistic, factually accurate data that represents ${model}'s actual capabilities, market position, and characteristics.

        📋 TOOL ANALYSIS FRAMEWORK:
        Before generating data, consider these aspects of "${model}":
        1. What type of AI tool/model is it? (Foundation model, application, service, etc.)
        2. Who are its primary users? (Developers, businesses, consumers, etc.)
        3. What are its core capabilities? (Text generation, image creation, coding, etc.)
        4. How is it typically accessed? (API, web app, mobile app, etc.)
        5. What makes it unique in the market?

        📊 FIELD SPECIFICATIONS & VALIDATION RULES:

        **CORE INFORMATION:**
        - shortDescription: string (REQUIRED)
          • Write 1-2 sentences that accurately describe what ${model} does
          • Be specific about its primary function and key capabilities
          • Example: "Advanced large language model that excels at code generation, mathematical reasoning, and multilingual text understanding with 128K context window."

        - publishedAt: string | null
          • Use actual release date if known (format: "YYYY-MM-DD")
          • Use null if unknown or not yet released
          • Research the tool's actual launch date

        - websiteUrl: string
          • Provide the official website URL if it exists
          • Use empty string "" if no official website
          • Example: "https://openai.com" or ""

        - keywords: string[] (4-6 items)
          • Choose highly specific, technical keywords that describe ${model}'s capabilities
          • Avoid generic terms like "AI" or "machine learning"
          • Example: ["code generation", "mathematical reasoning", "128K context", "multimodal AI", "reasoning engine"]

        **USER TARGETING:**
        - toolUserTypes: ToolUserType[] (3-5 items)
          • Select user types who would actually use ${model}
          • Consider the tool's complexity, cost, and use cases
          • Available options: DEVELOPER, SOFTWARE_ENGINEER, MACHINE_LEARNING_ENGINEER, DATA_SCIENTIST, AI_RESEARCHER, IT_PROFESSIONAL, CLOUD_ENGINEER, DEVOPS_ENGINEER, CYBERSECURITY_SPECIALIST, QA_ENGINEER, ENTREPRENEUR, BUSINESS_OWNER, PRODUCT_MANAGER, PROJECT_MANAGER, BUSINESS_ANALYST, CONSULTANT, SALES_PROFESSIONAL, CUSTOMER_SUPPORT_AGENT, OPERATIONS_MANAGER, STRATEGY_PLANNER, MARKETER, DIGITAL_MARKETER, SEO_SPECIALIST, SOCIAL_MEDIA_MANAGER, BRAND_MANAGER, ADVERTISING_SPECIALIST, DESIGNER, GRAPHIC_DESIGNER, UX_UI_DESIGNER, VIDEO_EDITOR, CONTENT_CREATOR, WRITER, COPYWRITER, MUSIC_PRODUCER, ANIMATOR, STUDENT, TEACHER, TRAINER, RESEARCHER, EDUCATOR, HEALTHCARE_PROFESSIONAL, LEGAL_PROFESSIONAL, FINANCE_PROFESSIONAL, HR_PROFESSIONAL, GAMER, HOBBYIST, OTHER

        **PRICING & BUSINESS MODEL:**
        - pricingType: PricingType[]
          • Research the actual pricing model of ${model}
          • Options: FREE, FREEMIUM, PAID, CUSTOM, TRIAL
          • Consider: Is it free? Has freemium tier? Enterprise pricing?

        **TECHNICAL CLASSIFICATION:**
        - aiType: AiType[] 
          • Select types that accurately describe ${model}
          • Options: GENERATIVE_AI, CONVERSATIONAL_AI, COMPUTER_VISION, SPEECH_AI, RECOMMENDATION_AI, AUTOMATION_AI, ANALYTICS_AI, SEARCH_RETRIEVAL_AI, CODE_AI, MARKETING_AI, SECURITY_AI, OTHER

        - productType: ProductType[] 
          • What type of product is ${model}?
          • Options: APPLICATION, MODEL, DATASET, AGENT, FRAMEWORK, TOOLKIT, TEMPLATE, SERVICE, HARDWARE, OTHER

        - aiCapabilities: AiCapability[] (3-6 items)
          • Select capabilities that ${model} actually has
          • Options: FOUNDATION_MODEL, GENERATIVE_TEXT, GENERATIVE_IMAGE, GENERATIVE_AUDIO, GENERATIVE_VIDEO, MULTIMODAL_UNDERSTANDING, NLP_UNDERSTANDING, SEARCH_RETRIEVAL, KNOWLEDGE_AI, COMPUTER_VISION, OCR_DOCUMENT_AI, SPEECH_ASR, SPEECH_TTS, SPEAKER_TECH, RECOMMENDATION, TIME_SERIES_FORECASTING, OPTIMIZATION_PLANNING, ANOMALY_DETECTION, CAUSAL_INFERENCE, ANALYTICS_BI, CODE_AI, SECURITY_ML, PRIVACY_PRESERVING_ML, MLOPS_OBSERVABILITY, SYNTHETIC_DATA, ROBOTICS_CONTROL, EDGE_AI, OTHER

        - modalities: Modality[] (1-4 items)
          • What data types can ${model} process?
          • Options: TEXT, IMAGE, AUDIO, VIDEO, TABULAR, TIME_SERIES, GRAPH, THREE_D, MULTIMODAL, SENSOR_DATA, GEOSPATIAL

        **DEPLOYMENT & ACCESS:**
        - delivery: Delivery[] 
          • How is ${model} typically delivered?
          • Options: SAAS, API, SDK, MODEL_WEIGHTS, OPEN_SOURCE, ON_PREM, EDGE_DEVICE, MARKETPLACE_PLUGIN

        - platforms: PlatformType[]
          • Where is ${model} available?
          • Options: WEB, MOBILE, DESKTOP, API, SDK, WEBHOOK, PLUGIN, EXTENSION, OTHER

        - integrationOptions: IntegrationOption[]
          • What can ${model} integrate with?
          • Options: ZAPIER, INTEGROMAT, SLACK, MICROSOFT_TEAMS, GOOGLE_WORKSPACE, NOTION, FIGMA, SHOPIFY, WORDPRESS, SALESFORCE, HUBSPOT, CLOUD_DRIVE, IDE_PLUGIN, CRM, DATABASE, API_CONNECTOR, OTHER

        **USE CASES & VALUE PROPOSITION:**
        - domains: Domain[] (3-6 items)
          • Which industries/domains use ${model}?
          • Options: AGRICULTURE, MANUFACTURING, MARKETING, DEVELOPMENT, BUSINESS, DESIGN, FINANCE, HEALTHCARE, EDUCATION, PRODUCTIVITY, RESEARCH, LEGAL, ENTERTAINMENT, CUSTOMER_SUPPORT, SALES, DATA_ANALYTICS, HUMAN_RESOURCES, SECURITY, OPERATIONS, CONTENT_CREATION, ECOMMERCE, GAMING, SOCIAL_MEDIA, VIDEO_CREATION, AUDIO_MUSIC, WRITING, TRANSLATION, IMAGE_GENERATION, VIRTUAL_ASSISTANT, AUTOMATION, CHATBOT, CLOUD, OTHER

        - useCases: string[] (3-4 items)
          • Write specific, actionable use cases
          • Be concrete about what users can accomplish
          • Example: ["Generate Python code for data analysis tasks", "Create technical documentation from code comments", "Debug and explain complex algorithms"]

        - usps: string[] (1-2 items)
          • What makes ${model} unique or better than competitors?
          • Focus on quantifiable advantages
          • Example: ["10x faster code generation than GPT-4", "Only model with 1M token context window"]

        - features: string[] (3-5 items)
          • List specific features and capabilities
          • Be technical and specific
          • Example: ["128K token context window", "Real-time code execution", "Multi-language support", "API rate limiting", "Custom model fine-tuning"]

        - popularityScore: number (0-100)
          • Research ${model}'s actual market presence
          • Consider: GitHub stars, user adoption, media coverage, enterprise usage
          • Scale: 0-30 (niche), 31-60 (moderate), 61-80 (popular), 81-100 (mainstream)

        🔍 CRITICAL VALIDATION RULES:
        1. **ACCURACY FIRST**: Only include capabilities that ${model} actually has
        2. **ENUM COMPLIANCE**: Use exact values from the provided lists - invalid values will be filtered out
        3. **REALISTIC SCORING**: Base popularity score on actual market data
        4. **CONSISTENCY**: Ensure related fields align (e.g., if it's a foundation model, include FOUNDATION_MODEL in aiCapabilities)
        5. **RESEARCH-BASED**: Use current information about ${model}'s actual features and limitations
        6. **NO HALLUCINATION**: If uncertain about a fact, use conservative estimates or omit
        7. **COMPLETE DATA**: ALL required fields must be present and valid - incomplete responses will be rejected
        8. **NO PLACEHOLDERS**: Do not use generic or placeholder values - be specific and accurate

        📝 OUTPUT FORMAT:
        Return ONLY a valid JSON object with the exact structure specified. No markdown, no explanations, no additional text.

        Generate data for: "${model}"
        `;

        // Try with the most capable model first, with fallback options
        let response;
        const models = ['gemini-2.5-flash-lite'];

        for (const modelName of models) {
          try {
            response = await ai.models.generateContent({
              model: modelName,
              contents: prompt,
            });
            console.log(`Successfully used model: ${modelName}`);
            break;
          } catch (modelError) {
            console.warn(`Failed to use model ${modelName}:`, modelError);
            if (modelName === models[models.length - 1]) {
              throw modelError; // If all models fail, throw the last error
            }
          }
        }

        console.log('Raw AI response:', response);

        // --- robust text extraction ---
        let text = '';
        if (
          response?.candidates &&
          response.candidates.length > 0 &&
          response.candidates[0]?.content?.parts &&
          response.candidates[0].content.parts.length > 0
        ) {
          text = response.candidates[0].content.parts
            .map((p: any) => p.text)
            .join('\n');
        } else if (response.text) {
          text = response.text;
        }

        // Remove code block markers
        text = text.trim();
        text = text
          .replace(/^```json\s*/, '')
          .replace(/^```/, '')
          .replace(/```$/, '')
          .trim();

        // --- parse JSON safely with enhanced error handling ---
        let aiData;
        try {
          aiData = JSON.parse(text);

          // Validate required fields exist
          const requiredFields = [
            'shortDescription',
            'keywords',
            'toolUserTypes',
            'pricingType',
            'aiType',
            'productType',
            'aiCapabilities',
            'modalities',
            'delivery',
            'platforms',
            'integrationOptions',
            'domains',
            'useCases',
            'usps',
            'features',
            'popularityScore',
          ];
          const missingFields = requiredFields.filter(
            (field) => !aiData.hasOwnProperty(field),
          );

          if (missingFields.length > 0) {
            console.error(
              `Missing required fields for ${model}:`,
              missingFields,
            );
            throw new Error(
              `Incomplete AI response for ${model} - missing fields: ${missingFields.join(', ')}`,
            );
          }

          // Filter out invalid enum values (keep only valid ones)
          const filterEnumField = (field: string, validValues: string[]) => {
            if (aiData[field] && Array.isArray(aiData[field])) {
              const originalLength = aiData[field].length;
              aiData[field] = aiData[field].filter((value: string) =>
                validValues.includes(value),
              );
              const removedCount = originalLength - aiData[field].length;
              if (removedCount > 0) {
                console.warn(
                  `Removed ${removedCount} invalid enum values for ${field} in ${model}`,
                );
              }
            }
          };

          // Apply filtering for each enum field (using first few valid values as examples)
          filterEnumField('toolUserTypes', [
            'DEVELOPER',
            'SOFTWARE_ENGINEER',
            'MACHINE_LEARNING_ENGINEER',
            'DATA_SCIENTIST',
            'AI_RESEARCHER',
            'IT_PROFESSIONAL',
            'CLOUD_ENGINEER',
            'DEVOPS_ENGINEER',
            'CYBERSECURITY_SPECIALIST',
            'QA_ENGINEER',
            'ENTREPRENEUR',
            'BUSINESS_OWNER',
            'PRODUCT_MANAGER',
            'PROJECT_MANAGER',
            'BUSINESS_ANALYST',
            'CONSULTANT',
            'SALES_PROFESSIONAL',
            'CUSTOMER_SUPPORT_AGENT',
            'OPERATIONS_MANAGER',
            'STRATEGY_PLANNER',
            'MARKETER',
            'DIGITAL_MARKETER',
            'SEO_SPECIALIST',
            'SOCIAL_MEDIA_MANAGER',
            'BRAND_MANAGER',
            'ADVERTISING_SPECIALIST',
            'DESIGNER',
            'GRAPHIC_DESIGNER',
            'UX_UI_DESIGNER',
            'VIDEO_EDITOR',
            'CONTENT_CREATOR',
            'WRITER',
            'COPYWRITER',
            'MUSIC_PRODUCER',
            'ANIMATOR',
            'STUDENT',
            'TEACHER',
            'TRAINER',
            'RESEARCHER',
            'EDUCATOR',
            'HEALTHCARE_PROFESSIONAL',
            'LEGAL_PROFESSIONAL',
            'FINANCE_PROFESSIONAL',
            'HR_PROFESSIONAL',
            'GAMER',
            'HOBBYIST',
            'OTHER',
          ]);
          filterEnumField('pricingType', [
            'FREE',
            'FREEMIUM',
            'PAID',
            'CUSTOM',
            'TRIAL',
          ]);
          filterEnumField('aiType', [
            'GENERATIVE_AI',
            'CONVERSATIONAL_AI',
            'COMPUTER_VISION',
            'SPEECH_AI',
            'RECOMMENDATION_AI',
            'AUTOMATION_AI',
            'ANALYTICS_AI',
            'SEARCH_RETRIEVAL_AI',
            'CODE_AI',
            'MARKETING_AI',
            'SECURITY_AI',
            'OTHER',
          ]);
          filterEnumField('productType', [
            'APPLICATION',
            'MODEL',
            'DATASET',
            'AGENT',
            'FRAMEWORK',
            'TOOLKIT',
            'TEMPLATE',
            'SERVICE',
            'HARDWARE',
            'OTHER',
          ]);
          filterEnumField('aiCapabilities', [
            'FOUNDATION_MODEL',
            'GENERATIVE_TEXT',
            'GENERATIVE_IMAGE',
            'GENERATIVE_AUDIO',
            'GENERATIVE_VIDEO',
            'MULTIMODAL_UNDERSTANDING',
            'NLP_UNDERSTANDING',
            'SEARCH_RETRIEVAL',
            'KNOWLEDGE_AI',
            'COMPUTER_VISION',
            'OCR_DOCUMENT_AI',
            'SPEECH_ASR',
            'SPEECH_TTS',
            'SPEAKER_TECH',
            'RECOMMENDATION',
            'TIME_SERIES_FORECASTING',
            'OPTIMIZATION_PLANNING',
            'ANOMALY_DETECTION',
            'CAUSAL_INFERENCE',
            'ANALYTICS_AI',
            'CODE_AI',
            'SECURITY_ML',
            'PRIVACY_PRESERVING_ML',
            'MLOPS_OBSERVABILITY',
            'SYNTHETIC_DATA',
            'ROBOTICS_CONTROL',
            'EDGE_AI',
            'OTHER',
          ]);
          filterEnumField('modalities', [
            'TEXT',
            'IMAGE',
            'AUDIO',
            'VIDEO',
            'TABULAR',
            'TIME_SERIES',
            'GRAPH',
            'THREE_D',
            'MULTIMODAL',
            'SENSOR_DATA',
            'GEOSPATIAL',
          ]);
          filterEnumField('delivery', [
            'SAAS',
            'API',
            'SDK',
            'MODEL_WEIGHTS',
            'OPEN_SOURCE',
            'ON_PREM',
            'EDGE_DEVICE',
            'MARKETPLACE_PLUGIN',
          ]);
          filterEnumField('platforms', [
            'WEB',
            'MOBILE',
            'DESKTOP',
            'API',
            'SDK',
            'WEBHOOK',
            'PLUGIN',
            'EXTENSION',
            'OTHER',
          ]);
          filterEnumField('integrationOptions', [
            'ZAPIER',
            'INTEGROMAT',
            'SLACK',
            'MICROSOFT_TEAMS',
            'GOOGLE_WORKSPACE',
            'NOTION',
            'FIGMA',
            'SHOPIFY',
            'WORDPRESS',
            'SALESFORCE',
            'HUBSPOT',
            'CLOUD_DRIVE',
            'IDE_PLUGIN',
            'CRM',
            'DATABASE',
            'API_CONNECTOR',
            'OTHER',
          ]);
          filterEnumField('domains', [
            'AGRICULTURE',
            'MANUFACTURING',
            'MARKETING',
            'DEVELOPMENT',
            'BUSINESS',
            'DESIGN',
            'FINANCE',
            'HEALTHCARE',
            'EDUCATION',
            'PRODUCTIVITY',
            'RESEARCH',
            'LEGAL',
            'ENTERTAINMENT',
            'CUSTOMER_SUPPORT',
            'SALES',
            'DATA_ANALYTICS',
            'HUMAN_RESOURCES',
            'SECURITY',
            'OPERATIONS',
            'CONTENT_CREATION',
            'ECOMMERCE',
            'GAMING',
            'SOCIAL_MEDIA',
            'VIDEO_CREATION',
            'AUDIO_MUSIC',
            'WRITING',
            'TRANSLATION',
            'IMAGE_GENERATION',
            'VIRTUAL_ASSISTANT',
            'AUTOMATION',
            'CHATBOT',
            'CLOUD',
            'OTHER',
          ]);

          // Ensure popularity score is within valid range
          if (
            typeof aiData.popularityScore !== 'number' ||
            aiData.popularityScore < 0 ||
            aiData.popularityScore > 100
          ) {
            console.error(
              `Invalid popularity score for ${model}:`,
              aiData.popularityScore,
            );
            throw new Error(
              `Invalid popularity score for ${model}: must be a number between 0-100`,
            );
          }
        } catch (err) {
          console.error(
            `Failed to process AI response for ${model}:`,
            err,
            'Raw text:',
            text,
          );
          console.log(`Skipping ${model} due to invalid response`);
          errorCount++;
          errors.push(`${model}: ${err.message}`);
          continue; // Skip this model and move to the next one
        }
        console.log('aiData', aiData);

        const ourData: CreateListedAiToolInput = {
          name: model,
          logoUrl: '',
          shortDescription: aiData.shortDescription || '',
          websiteUrl: aiData.websiteUrl || '',
          keywords: aiData.keywords || [],
          toolUserTypes: aiData.toolUserTypes || [],
          pricingType: aiData.pricingType || [],
          aiType: aiData.aiType || [],
          productType: aiData.productType || [],
          aiCapabilities: aiData.aiCapabilities || [],
          modalities: aiData.modalities || [],
          delivery: aiData.delivery || [],
          platforms: aiData.platforms || [],
          integrationOptions: aiData.integrationOptions || [],
          domains: aiData.domains || [],
          useCases: aiData.useCases || [],
          featured: false,
          verified: false,
          popularityScore: aiData.popularityScore || 0,
          listedBy: ListedBy.GEMENAI,
          usps: aiData.usps || [],
          features: aiData.features || [],
          publishedAt: aiData.publishedAt ? new Date(aiData.publishedAt) : null,
        };

        console.log('Prepared DB data:', ourData);
        await this.createListedAiTool(1, ourData);
        console.log(`${model} added to database`);
        successCount++;
      }

      console.log(
        `createListedAiToolFromArray completed: ${successCount} successful, ${errorCount} errors`,
      );
      if (errors.length > 0) {
        console.log('Errors encountered:', errors);
      }
      return { data: [], error: null };
    } catch (error) {
      console.error('Error in createListedAiToolFromArray:', error);
      return { data: [], error: { message: 'Failed to process AI tools' } };
    }
  }

  async updateListedAiToolFromArrayForVideoUrl() {
    console.log('updateListedAiToolFromArrayForVideoUrl method called');
    // Update videoUrl field for existing AI tools in the database

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    try {
      for (const model of aiTools) {
        console.log(`Processing model: ${model}`);
        console.log('xxxxxxxxxxxxxxxxxxx', successCount, errorCount);

        const modelInDb = await this.prisma.listedAiTool.findFirst({
          where: { name: model },
          select: { id: true, name: true, videoUrl: true },
        });
        console.log('modelInDb', modelInDb);

        if (!modelInDb?.name) {
          console.log(`${model} not found in the database, skipping...`);
          continue;
        }
        // if videoUrl is already present in the database skipt the model and continue to the next one
        if (modelInDb.videoUrl) {
          console.log(
            `${model} videoUrl already present in the database, skipping...`,
          );
          successCount++;
          continue;
        }

        console.log(
          `Found ${model} in database, current videoUrl: ${modelInDb.videoUrl || 'null'}`,
        );

        // get the video url by api call to youtube
        const youtube = google.youtube({
          version: 'v3',
          auth: process.env.YOUTUBE_API_KEY, // store API key in .env
        });
        const res = await youtube.search.list({
          part: ['snippet'],
          q: `${model}  official demo`,
          type: ['video'],
          maxResults: 1, // you can increase if you want multiple results
        });
        console.log('ressssssssssss', res);
        const videoId = res?.data?.items[0]?.id?.videoId || null;

        // Check if videoUrl actually changed
        const newVideoUrl =
          `https://www.youtube.com/watch?v=${videoId}` as string;
        if (modelInDb.videoUrl === newVideoUrl) {
          console.log(
            `${model} videoUrl unchanged (${newVideoUrl || 'null'}), skipping update`,
          );
          successCount++;
          continue;
        }

        const ourData: UpdateListedAiToolInput = {
          id: modelInDb.id,
          videoUrl: newVideoUrl,
        };

        console.log(
          `Updating ${model} videoUrl from "${modelInDb.videoUrl || 'null'}" to "${newVideoUrl || 'null'}"`,
        );

        try {
          await this.updateListedAiTool(modelInDb.id, ourData);
          console.log(`✅ Successfully updated ${model} videoUrl`);
          successCount++;
        } catch (updateError) {
          console.error(`❌ Failed to update ${model} videoUrl:`, updateError);
          errorCount++;
          errors.push(
            `${model}: Database update failed - ${updateError.message}`,
          );
        }
      }

      console.log(
        `🎬 updateListedAiToolFromArrayForVideoUrl completed: ${successCount} successful, ${errorCount} errors`,
      );
      if (errors.length > 0) {
        console.log('❌ Errors encountered:', errors);
      }
      return {
        data: {
          successCount,
          errorCount,
          totalProcessed: aiTools.length,
          errors: errors.length > 0 ? errors : null,
        },
        error: null,
      };
    } catch (error) {
      console.error(
        '💥 Error in updateListedAiToolFromArrayForVideoUrl:',
        error,
      );
      return {
        data: null,
        error: {
          message: 'Failed to process video URL updates',
          details: error.message,
        },
      };
    }
  }

  async updateListedAiTool(toolId: number, data: UpdateListedAiToolInput) {
    const res = await this.prisma.listedAiTool.update({
      where: { id: toolId },
      data,
    });
    return {
      data: res,
      error: null,
    };
  }

  async deleteListedAiTool(toolId: number) {
    const res = await this.prisma.listedAiTool.delete({
      where: { id: toolId },
    });
    return {
      data: res,
      error: null,
    };
  }

  async verifyListedAiTool(toolId: number, userType: string, status: boolean) {
    if (userType === UserType.ADMIN) {
      const res = await this.prisma.listedAiTool.update({
        where: { id: toolId },
        data: {
          verified: status,
        },
      });
      console.log('calling verify listed ai tool', res.id, status);
      if (res.id && status) {
        console.log('inside');
        // send email saying your listed ai tool has been verified
      }
      return {
        data: res,
        error: null,
      };
    } else {
      return {
        data: null,
        error: {
          message: 'not allowed',
        },
      };
    }
  }
}
