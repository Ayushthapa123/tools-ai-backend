// src/modules/tools/io-generic/io-generic.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { GoogleGenAI } from '@google/genai';

import { IOGenericInput } from './dto/io-generic.input';
import { IOGeneric } from './models/io-generic.model';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

@Injectable()
export class IoGenericService {
  constructor(private readonly prismaService: PrismaService) {}

  async processGenericIO(input: IOGenericInput): Promise<IOGeneric> {
    console.log('Generic IO Input:', input);

    try {
      // Extract schema and data from input
      const { schema, data } = input;

      // Use the custom prompt and output format guide from the input
      const prompt = this.buildCustomPrompt(schema, data);

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
      if (text.startsWith('```html')) {
        text = text
          .replace(/^```html/, '')
          .replace(/```$/, '')
          .trim();
      } else if (text.startsWith('```')) {
        text = text.replace(/^```/, '').replace(/```$/, '').trim();
      }

      // Return the HTML response directly
      return {
        data: {
          htmlResponse: text,
        },
      };
    } catch (error) {
      console.error('Failed to process generic IO:', error);
      return {
        data: {
          htmlResponse:
            'Sorry, we encountered an error processing your request. Please try again.',
        },
      };
    }
  }

  private buildCustomPrompt(schema: any, data: any): string {
    // Extract the custom prompt and output format guide from schema
    const { customPrompt, outputFormatGuide, inputSchema } = schema;

    let prompt = '';

    // Use the custom prompt if provided
    if (customPrompt) {
      prompt += `${customPrompt}\n\n`;
    }

    // Add input schema information if provided
    if (inputSchema) {
      prompt += `Input Schema:\n${JSON.stringify(inputSchema, null, 2)}\n\n`;
    }

    // Add the actual input data
    prompt += `Input Data:\n${JSON.stringify(data, null, 2)}\n\n`;

    // Add output format guide if provided
    if (outputFormatGuide) {
      prompt += `Output Format Guide:\n${outputFormatGuide}\n\n`;
    }

    // Always instruct to return HTML
    prompt += `IMPORTANT: Please provide your response in HTML format. ${outputFormatGuide ? 'Follow the output format guide above.' : 'Format the response appropriately for web display.'} Do not include markdown code blocks, just return the HTML directly.`;

    return prompt;
  }
}
