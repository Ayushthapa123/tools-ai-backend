// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
const { GoogleGenAI } = require('@google/genai');


import { TravelBudgetCalculatorInput } from './dto/tbc.input';
import { TBCList } from './models/tbc.model';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

@Injectable()
export class TbcService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTravelBudget(tbc: TravelBudgetCalculatorInput): Promise<TBCList> {
    console.log('tbc', tbc);
    const prompt = `
You are a travel budget expert. Given the following travel details, provide a detailed travel budget breakdown and a personalized travel guide.

Travel Details:
- Start Country: ${tbc.startCountry}
- Start City: ${tbc.startCity}
- Destination Country: ${tbc.travelCountry}
- Destination City: ${tbc.travelCity}
- Travel Style: ${tbc.travelStyle}
- Accommodation Type: ${tbc.accomodationType}
- Number of Days: ${tbc.numberOfDays}
- Purpose: ${tbc.purpose}
- Date of Travel: ${tbc.date}

Instructions:
1. All budget values must be in USD.
2. The budget breakdown must include the following categories (add more if needed):
   - Local Transport In city
   - Return Ticket Price
   - Going Ticket Price
   - Shopping & Activity Cost
   - Accommodation
   - Food
3. For each budget item, provide:
   - category (as above)
   - cost (numeric, in USD)
   - currency (always 'USD')
   - shortGuide (a one-sentence tip or note for this category)
   - per (use phrasing like 'for ${tbc.numberOfDays} day trip', 'for 1 day', etc. Do not use 'per trip')
4. After the budget, write a personalized travel guide (max 200 words) tailored to the input details, including tips, must-see places, and advice for the travel style and purpose.

Output format:
{
  "data": [ ...budget items as described above... ],
  "personalizedTravelGuide": "...your guide here..."
}
`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: prompt,
    });
    console.log('rrrrrrrrrrrrr', response);

    let text = '';
    // Gemini Node.js SDK: response.candidates[0].content.parts[0].text
    if (
      response &&
      response.candidates &&
      response.candidates[0] &&
      response.candidates[0].content &&
      response.candidates[0].content.parts &&
      response.candidates[0].content.parts[0].text
    ) {
      text = response.candidates[0].content.parts[0].text;
    } else if (response.text) {
      // fallback for older SDKs
      text = response.text;
    }

    // Remove code block markers if present (e.g., ```json ... ```)
    text = text.trim();
    if (text.startsWith('```json')) {
      text = text
        .replace(/^```json/, '')
        .replace(/```$/, '')
        .trim();
    } else if (text.startsWith('```')) {
      text = text.replace(/^```/, '').replace(/```$/, '').trim();
    }

    let parsed: any = {};
    const guideText = text;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      // fallback: try to extract JSON from text
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          parsed = JSON.parse(match[0]);
        } catch (e2) {
          parsed = { data: null, personalizedTravelGuide: text };
        }
      } else {
        parsed = { data: null, personalizedTravelGuide: text };
      }
    }

    // If the AI returned the JSON as a string in personalizedTravelGuide, parse it
    if (
      parsed.personalizedTravelGuide &&
      typeof parsed.personalizedTravelGuide === 'string'
    ) {
      let inner = parsed.personalizedTravelGuide.trim();
      if (inner.startsWith('```json')) {
        inner = inner
          .replace(/^```json/, '')
          .replace(/```$/, '')
          .trim();
      } else if (inner.startsWith('```')) {
        inner = inner.replace(/^```/, '').replace(/```$/, '').trim();
      }
      try {
        const innerParsed = JSON.parse(inner);
        if (innerParsed.data && innerParsed.personalizedTravelGuide) {
          parsed = innerParsed;
        }
      } catch (e) {
        // ignore, keep as is
      }
    }

    return {
      data: parsed.data || null,
      personalizedTravelGuide: parsed.personalizedTravelGuide || guideText,
    };
  }
}
