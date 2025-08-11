// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { GoogleGenAI } from '@google/genai';

import { TravelDestinationFinderInput } from './dto/tdf.input';
import { TDFList } from './models/tdf.model';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

@Injectable()
export class TdfService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTravelDestination(
    tbc: TravelDestinationFinderInput,
  ): Promise<TDFList> {
    console.log('Travel Input:', tbc);
    const prompt = `
You are an expert travel advisor. Based on the following travel preferences, suggest suitable destinations and provide a detailed travel guide.

Travel Details:
- Start Country: ${tbc.startCountry}
- Start City: ${tbc.startCity}
- Travel Duration: ${tbc.travelDuration}
- Travel Type: ${tbc.travelType}
- Budget (USD): ${tbc.travelBudgetUSD}
- Travel Companion: ${tbc.travelCompanionType}
- Activities of Interest: ${tbc.travelActivities.join(', ')}
- Purpose: ${tbc.purpose}
- Travel Date: ${tbc.date}

Instructions:
1. Provide 2-3 destination recommendations based on the preferences above.
2. For each destination, include:
   - destinationCountry: Name of the country
   - destinationPlace: Specific city or location
   - activitiesToDo: List of 4-5 must-do activities
   - expectedCost: Estimated cost range in USD (e.g., "$1500-$2000")
   - shortGuide: A concise 2-3 sentence guide about the destination

3. Also provide a personalizedTravelGuide with:
   - Detailed day-by-day itinerary suggestions
   - Travel tips specific to the companion type
   - Budget allocation advice
   - Best time to visit
   - Local customs and etiquette
   (Keep this under 300 words)

Output format:
{
  "data": [
    {
      "destinationCountry": "string",
      "destinationPlace": "string",
      "activitiesToDo": ["string"],
      "expectedCost": "string",
      "shortGuide": "string"
    }
  ],
  "personalizedTravelGuide": "string"
}
`;

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
      return {
        data: Array.isArray(parsed.data) ? parsed.data : [parsed.data],
        personalizedTravelGuide: parsed.personalizedTravelGuide || '',
      };
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      return {
        data: [],
        personalizedTravelGuide:
          'Sorry, we encountered an error processing your request. Please try again.',
      };
    }
  }
}
