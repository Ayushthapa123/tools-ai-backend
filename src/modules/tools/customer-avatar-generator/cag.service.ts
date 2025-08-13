import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { GoogleGenAI } from '@google/genai';

import { CustomerAvatarGeneratorInput } from './dto/cag.input';
import { CAGList } from './models/cag.model';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

@Injectable()
export class CagService {
  constructor(private readonly prismaService: PrismaService) {}

  async generateCustomerAvatar(
    input: CustomerAvatarGeneratorInput,
  ): Promise<CAGList> {
    const prompt = `
You are a senior marketing strategist. Based only on the following business details, generate a concise, well-structured ideal customer avatar.

Business Details:
- Name: ${input.businessName}
- Description: ${input.businessDescription}

Please provide:
1) A categorized list of key points under exactly these categories:
   - Demographics
   - Firmographics
   - Behavior
   - Psychographics
   - Messaging

2) A short but comprehensive personalized customer avatar summary paragraph.

Output strictly valid JSON, no extra commentary, in the following schema:
{
  "data": [
    { "category": "Demographics", "items": ["item1", "item2", "..."] },
    { "category": "Firmographics", "items": ["item1", "item2", "..."] },
    { "category": "Behavior", "items": ["item1", "item2", "..."] },
    { "category": "Psychographics", "items": ["item1", "item2", "..."] },
    { "category": "Messaging", "items": ["item1", "item2", "..."] }
  ],
  "personalizedCustomerAvatar": "A concise, realistic summary tailored to the business"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: prompt,
    });

    let text = '';
    if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
      text = response.candidates[0].content.parts[0].text;
    } else if (response.text) {
      text = response.text;
    }

    text = text.trim();
    if (text.startsWith('```json')) {
      text = text
        .replace(/^```json/, '')
        .replace(/```$/, '')
        .trim();
    } else if (text.startsWith('```')) {
      text = text.replace(/^```/, '').replace(/```$/, '').trim();
    }

    try {
      const parsed = JSON.parse(text);
      const result: CAGList = {
        data: Array.isArray(parsed.data) ? parsed.data : [],
        personalizedCustomerAvatar: parsed.personalizedCustomerAvatar || '',
      };
      return result;
    } catch (error) {
      const errorResult: CAGList = {
        data: [],
        personalizedCustomerAvatar: '',
      };
      return errorResult;
    }
  }
}
