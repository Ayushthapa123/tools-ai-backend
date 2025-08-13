// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { GoogleGenAI } from '@google/genai';

import { TravelChecklistGeneratorInput } from './dto/tcg.input';
import { TCGList } from './models/tcg.model';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

@Injectable()
export class TcgService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTravelChecklist(
    tcg: TravelChecklistGeneratorInput,
  ): Promise<TCGList> {
    console.log('Travel Input:', tcg);
    const prompt = `
You are an expert travel advisor. Based on the following travel details, generate a comprehensive travel checklist organized by categories and a personalized travel guide.

Travel Details:
- Start Country: ${tcg.startCountry}
- Start City: ${tcg.startCity}
- Destination Country: ${tcg.destinationCountry}
- Destination City: ${tcg.destinationCity}
- Travel Duration: ${tcg.travelDuration}
- Travel Type: ${tcg.travelType}
- Travel Companion: ${tcg.travelCompanionType}
- Activities: ${tcg.travelActivities.join(', ')}
- Purpose: ${tcg.purpose}
- Travel Date: ${tcg.date.toISOString().split('T')[0]}

Please provide:
1. A detailed checklist organized into the following categories:
   - Documents
   - Money & Payments
   - Clothing
   - Health & Safety
   - Daily Use
   - Snacks And Hydration
   - Tools & Electronics
   - Other Recommendations
   - Must Have Rechecks (Reminders)
   - Prohibited Items (According to Destination Laws)

2. A personalized travel guide that includes:
   - Local customs and etiquette
   - Weather considerations
   - Transportation tips
   - Must-visit places based on interests
   - Local cuisine recommendations
   - Safety tips specific to the destination
   - Cultural insights
   - Language essentials (if applicable)

Output format:
{
  "data": [
    {
      "category": "Documents",
      "items": ["item1", "item2", ...]
    },
    {
      "category": "Money & Payments",
      "items": ["item1", "item2", ...]
    },
    {
      "category": "Prohibited Items",
      "items": ["List of items not allowed according to destination laws and regulations"]
    }
    // ... other categories
  ],
  "personalizedTravelGuide": "A short but comprehensive guide covering local customs, weather, transportation, attractions, cuisine, safety, culture, and language essentials..."
}

Consider the travel type, duration, and companion type when generating both the checklist and travel guide. Make sure recommendations are specific and relevant to the destination and activities planned. Format the travel guide as a well-structured text with clear sections and bullet points.`;

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

    // Clean up the response text
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
      const response: TCGList = {
        data: parsed.data,
        personalizedTravelGuide: parsed.personalizedTravelGuide,
      };
      return response;
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      const errorResponse: TCGList = {
        data: [],
        personalizedTravelGuide: '',
      };
      return errorResponse;
    }
  }
}
