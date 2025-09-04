import { UpdateListedAiToolInput } from './dtos/update-listed-ai-tool.input';
import { Injectable } from '@nestjs/common';
// import { HostelData } from '@src/models/global.model';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateListedAiToolInput } from './dtos/create-listed-ai-tool.input';
import { ToolUserType, UserType, ListedBy } from '@src/models/global.enum';
import { CookieService } from '../auth/services/cookie.service';
import { generateSlug } from '@src/helpers/generateSlug';
import { GoogleGenAI } from '@google/genai';
import { aiTools } from '@src/data/ai-tools-seed';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
@Injectable()
export class ListedAiToolService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cookieService: CookieService,
  ) {}

  async getAllListedAiTools(
    pageSize: number,
    pageNumber: number,
    isSuperAdmin: boolean,
  ) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    // superadmin should get all verified/non verified hostels but other should get only verified
    const tools = await this.prisma.listedAiTool.findMany({
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
  async getListedAiToolsWithHighPopularityScore(
    pageSize: number,
    pageNumber: number,
    isSuperAdmin: boolean,
  ) {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    // superadmin should get all verified/non verified hostels but other should get only verified
    const tools = await this.prisma.listedAiTool.findMany({
      skip,
      take,
      where: {
        popularityScore: {
          gt: 84,
        },
      },
      orderBy: {
        createdAt: 'desc',
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
  async createListedAiToolFromArray() {
    console.log('createListedAiToolFromArray method called');
    // list few ai tools for each usertype,domain, aitype, modality in data.ts file and get from there

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

        // Prompt: instruct AI to generate full schema-compliant JSON
        const prompt = `
        You are an AI expert creating realistic data for an AI tool named "${model}". Generate JSON data that accurately represents this tool's capabilities and characteristics.

        CONTEXT: ${model} is a state-of-the-art AI model. Consider its actual capabilities when generating data.

        FIELD SPECIFICATIONS (with examples and constraints):

        - shortDescription: string - Write a realistic, specific description (1-2 sentences) that explains what ${model} actually does. Example: "Advanced multimodal AI model that can understand and generate text, images, and code with human-like reasoning capabilities."
        - publishedAt: date - If this is a real tool, provide the actual published date. If unknown, use null. Example: "2025-01-01" or null

        - websiteUrl: string - If this is a real tool, provide the actual website. If unknown, use empty string "". Example: "https://openai.com" or ""

        - keywords: string[] - Choose 4-6 highly relevant, specific keywords that accurately describe ${model}'s capabilities. Example: ["multimodal AI", "code generation", "image understanding", "reasoning", "GPT-4 successor"]

        - toolUserTypes: ToolUserType[] - Select 3-5 user types that would actually use ${model}. Choose from:
          DEVELOPER, SOFTWARE_ENGINEER, MACHINE_LEARNING_ENGINEER, DATA_SCIENTIST, AI_RESEARCHER,
          IT_PROFESSIONAL, CLOUD_ENGINEER, DEVOPS_ENGINEER, CYBERSECURITY_SPECIALIST, QA_ENGINEER,
          ENTREPRENEUR, BUSINESS_OWNER, PRODUCT_MANAGER, PROJECT_MANAGER, BUSINESS_ANALYST, CONSULTANT,
          SALES_PROFESSIONAL, CUSTOMER_SUPPORT_AGENT, OPERATIONS_MANAGER, STRATEGY_PLANNER,
          MARKETER, DIGITAL_MARKETER, SEO_SPECIALIST, SOCIAL_MEDIA_MANAGER, BRAND_MANAGER, ADVERTISING_SPECIALIST,
          DESIGNER, GRAPHIC_DESIGNER, UX_UI_DESIGNER, VIDEO_EDITOR, CONTENT_CREATOR, WRITER, COPYWRITER,
          MUSIC_PRODUCER, ANIMATOR, STUDENT, TEACHER, TRAINER, RESEARCHER, EDUCATOR,
          HEALTHCARE_PROFESSIONAL, LEGAL_PROFESSIONAL, FINANCE_PROFESSIONAL, HR_PROFESSIONAL,
          GAMER, HOBBYIST, OTHER

        - pricingType: PricingType[] - Select 1-2 realistic pricing models. Choose from: FREE, FREEMIUM, PAID, CUSTOM, TRIAL
          For ${model}, consider: Is it free to use? Does it have a freemium tier? Is it paid-only?

        - aiType: AiType[] - Select  AI types that accurately describe ${model}. Choose from: GENERATIVE_AI, CONVERSATIONAL_AI, COMPUTER_VISION, SPEECH_AI, RECOMMENDATION_AI, AUTOMATION_AI, ANALYTICS_AI, SEARCH_RETRIEVAL_AI, CODE_AI, MARKETING_AI, SECURITY_AI, OTHER

        - productType: ProductType[] - Select  product types that ${model} actually is. Choose from: APPLICATION, MODEL, DATASET, AGENT, FRAMEWORK, TOOLKIT, TEMPLATE, SERVICE, HARDWARE, OTHER

        - aiCapabilities: AiCapability[] - Select  capabilities that ${model} actually has. Choose from: FOUNDATION_MODEL, GENERATIVE_TEXT, GENERATIVE_IMAGE, GENERATIVE_AUDIO, GENERATIVE_VIDEO, MULTIMODAL_UNDERSTANDING, NLP_UNDERSTANDING, SEARCH_RETRIEVAL, KNOWLEDGE_AI, COMPUTER_VISION, OCR_DOCUMENT_AI, SPEECH_ASR, SPEECH_TTS, SPEAKER_TECH, RECOMMENDATION, TIME_SERIES_FORECASTING, OPTIMIZATION_PLANNING, ANOMALY_DETECTION, CAUSAL_INFERENCE, ANALYTICS_BI, CODE_AI, SECURITY_ML, PRIVACY_PRESERVING_ML, MLOPS_OBSERVABILITY, SYNTHETIC_DATA, ROBOTICS_CONTROL, EDGE_AI, OTHER

        - modalities: Modality[] - Select modalities that ${model} can actually process. Choose from: TEXT, IMAGE, AUDIO, VIDEO, TABULAR, TIME_SERIES, GRAPH, THREE_D, MULTIMODAL, SENSOR_DATA, GEOSPATIAL

        - delivery: Delivery[] - Select  realistic delivery methods. Choose from: SAAS, API, SDK, MODEL_WEIGHTS, OPEN_SOURCE, ON_PREM, EDGE_DEVICE, MARKETPLACE_PLUGIN

        - platforms: PlatformType[] - Select platforms where ${model} is actually available. Choose from: WEB, MOBILE, DESKTOP, API, SDK, WEBHOOK, PLUGIN, EXTENSION, OTHER

        - integrationOptions: IntegrationOption[] - Select 2-4 realistic integration options. Choose from: ZAPIER, INTEGROMAT, SLACK, MICROSOFT_TEAMS, GOOGLE_WORKSPACE, NOTION, FIGMA, SHOPIFY, WORDPRESS, SALESFORCE, HUBSPOT, CLOUD_DRIVE, IDE_PLUGIN, CRM, DATABASE, API_CONNECTOR, OTHER

        - domains: Domain[] - Select  domains where ${model} would be most useful. Choose from: AGRICULTURE, MANUFACTURING, MARKETING, DEVELOPMENT, BUSINESS, DESIGN, FINANCE, HEALTHCARE, EDUCATION, PRODUCTIVITY, RESEARCH, LEGAL, ENTERTAINMENT, CUSTOMER_SUPPORT, SALES, DATA_ANALYTICS, HUMAN_RESOURCES, SECURITY, OPERATIONS, CONTENT_CREATION, ECOMMERCE, GAMING, SOCIAL_MEDIA, VIDEO_CREATION, AUDIO_MUSIC, WRITING, TRANSLATION, IMAGE_GENERATION, VIRTUAL_ASSISTANT, AUTOMATION, CHATBOT, CLOUD, OTHER

        - useCases: string[] - Write 3-4 specific, realistic use cases that ${model} can actually perform.Try to give the most valuable use cases. Example: ["Generate marketing copy for social media campaigns", "Analyze and summarize research papers", "Create code snippets for web development"]
        - usps: string[] - Write 1-2 specific, realistic usps(unique selling propositions) that ${model} can actually perform.Try to give the most valuable usps of this tool.Basically what is the single thing it can do better then any other tools out there. Example: ["It outperforms gpt-4 in terms of cost "]. If possible just give only one and as short as possible.

        - popularityScore: number - Assign a realistic popularity score (0-100) based on ${model}'s actual market presence and usage. Consider: Is it widely known? Is it actively used? Is it cutting-edge?

        VALIDATION RULES:
        1. All enum fields must use exact values from the corresponding lists above
        2. Be realistic - don't overstate capabilities
        3. Consider ${model}'s actual features and limitations
        4. Ensure data consistency across related fields. Carefully choose the enum values. Only give values that are actually present in the provided lists.
        5. Popularity score should reflect actual market reality

        Return ONLY valid JSON matching this structure. DO NOT add extra text or explanation.
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-lite', // Latest and most capable available Gemini model
          contents: prompt,
        });

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

        // --- parse JSON safely ---
        let aiData;
        try {
          aiData = JSON.parse(text);
        } catch (err) {
          console.warn(
            `Failed to parse AI JSON response for ${model}:`,
            err,
            'Raw text:',
            text,
          );
          continue; // skip this model if parsing fails
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
          platforms: aiData.platforms || ['WEB'],
          integrationOptions: aiData.integrationOptions || [],
          domains: aiData.domains || [],
          useCases: aiData.useCases || [],
          featured: false,
          verified: false,
          popularityScore: aiData.popularityScore || 0,
          listedBy: ListedBy.GEMENAI,
          usps: aiData.usps || [],
          publishedAt: aiData.publishedAt ? new Date(aiData.publishedAt) : null,
        };

        console.log('Prepared DB data:', ourData);
        await this.createListedAiTool(1, ourData);
        console.log(`${model} added to database`);
      }

      console.log('createListedAiToolFromArray completed successfully');
      return { data: [], error: null };
    } catch (error) {
      console.error('Error in createListedAiToolFromArray:', error);
      return { data: [], error: { message: 'Failed to process AI tools' } };
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
