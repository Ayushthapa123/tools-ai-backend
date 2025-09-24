// src/modules/tools/io-generic/io-generic.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { GoogleGenAI } from '@google/genai';
import Jimp from 'jimp';

import { IOGenericInput } from './dto/io-generic.input';
import { IOGeneric, IOGenericTextToImage } from './models/io-generic.model';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

@Injectable()
export class IoGenericService {
  constructor(private readonly prismaService: PrismaService) {}

  async processGenericIO(input: IOGenericInput): Promise<IOGeneric> {
    console.log('Generic IO Input:', input);
    // const toolSlug = input.data.slug;
    // console.log('toolSlug', toolSlug);
    // const toolOwner = await this.prismaService.tool.findUnique({
    //   where: {
    //     slug: toolSlug,
    //   },
    //   include: {
    //     owner: {
    //       include: {
    //         token: {
    //           select: {
    //             gemenaiToken: true,
    //           },
    //         },
    //       },
    //     },
    //   },
    // });

    // if token not foun return error TOKEN_NOT_FOUND
    // if (!toolOwner.owner.token.gemenaiToken) {
    //   return {
    //     data: null,
    //     error: {
    //       message: 'token not found',
    //       code: 'TOKEN_NOT_FOUND',
    //     },
    //   };
    // }

    // console.log('toolOwner', toolOwner);

    // const gemini = new GoogleGenAI({
    //   apiKey: toolOwner.owner.token.gemenaiToken,
    // });

    try {
      // Extract schema and data from input
      const { schema, data } = input;

      // Use the custom prompt and output format guide from the input
      const prompt = this.buildCustomPrompt(schema, data);
      console.log('prompt', prompt);

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

      // Return the HTML response directly (AI is instructed not to generate dangerous content)
      return {
        data: {
          htmlResponse: text,
        },
      };
    } catch (error) {
      console.error('Failed to process generic IO:', error);
      return {
        data: {
          htmlResponse: `Sorry, we encountered  an error processing please check your api token <a href="/app/settings">here</a>`,
        },
        error: {
          message: 'Failed to process generic IO',
          code: 'TOKEN_ERROR',
        },
      };
    }
  }

  async processGenericIOTextToImageOpenAI(
    input: IOGenericInput,
  ): Promise<IOGeneric> {
    console.log('Generic IO Input:', input);

    try {
      const prompt =
        'Generate a cover photo  image of a cat. Please make it 256x256 pixels. or as small as possible';

      const response = await openai.images.generate({
        model: 'gpt-image-1',
        prompt,
        size: 'auto',
        // response_format: 'url', // return a hosted URL
      });
      console.log('response', response);

      const imageUrl = response.data[0].url;

      return {
        data: {
          htmlResponse: imageUrl || null,
        },
      };
    } catch (error) {
      console.error('Failed to process generic IO:', error);
      return {
        data: {
          htmlResponse: null,
        },
      };
    }
  }
  async processGenericIOTextToImageGemini(
    input: IOGenericInput,
  ): Promise<IOGenericTextToImage> {
    console.log('Generic IO Input:', input);
    const toolSlug = input.data.slug;
    console.log('toolSlug', toolSlug);
    const toolOwner = await this.prismaService.tool.findUnique({
      where: {
        slug: toolSlug,
      },
      include: {
        owner: {
          include: {
            token: {
              select: {
                gemenaiToken: true,
              },
            },
          },
        },
      },
    });

    console.log('toolOwner', toolOwner);

    const gemini = new GoogleGenAI({
      apiKey: toolOwner.owner.token.gemenaiToken,
    });

    try {
      const prompt = this.buildCustomPromptTextToImage(
        input.schema,
        input.data,
      );

      // Ask Gemini for IMAGE output, not just text
      const response = await gemini.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
          // Note: mediaResolution is unreliable; we'll compress programmatically below
        },
      });

      let imageBase64: string | null = null;
      const parts = response?.candidates?.[0]?.content?.parts ?? [];

      for (const part of parts as any[]) {
        if (part?.inlineData?.data) {
          imageBase64 = part.inlineData.data as string;
          break;
        }
      }

      let lowResolutionImage: string | null = null;
      let mediumResolutionImage: string | null = null;
      let highResolutionImage: string | null = null;
      if (imageBase64) {
        // Programmatically reduce size without external services: Jimp resize (fit inside) + JPEG encode
        const inputBuffer = Buffer.from(imageBase64, 'base64');
        const image = await Jimp.read(inputBuffer);
        const thumbnailImageOriginal = image.clone();
        thumbnailImageOriginal.scaleToFit(256, 256); // non-cropping fit inside
        thumbnailImageOriginal.quality(60); // JPEG quality
        const compressedBufferLowResolution =
          await thumbnailImageOriginal.getBufferAsync(Jimp.MIME_JPEG);
        const compressedBase64LowResolution =
          compressedBufferLowResolution.toString('base64');
        lowResolutionImage = `data:image/jpeg;base64,${compressedBase64LowResolution}`;
        // medium resolution
        const mediumResolutionImageOriginal = image.clone();
        mediumResolutionImageOriginal.scaleToFit(512, 512); // non-cropping fit inside
        mediumResolutionImageOriginal.quality(60); // JPEG quality
        const compressedBufferMediumResolution =
          await mediumResolutionImageOriginal.getBufferAsync(Jimp.MIME_JPEG);
        const compressedBase64MediumResolution =
          compressedBufferMediumResolution.toString('base64');
        mediumResolutionImage = `data:image/jpeg;base64,${compressedBase64MediumResolution}`;
        // high resolution
        image.scaleToFit(1280, 1280); // non-cropping fit inside
        image.quality(50); // JPEG quality
        const compressedBufferHighResolution = await image.getBufferAsync(
          Jimp.MIME_JPEG,
        );
        const compressedBase64HighResolution =
          compressedBufferHighResolution.toString('base64');
        highResolutionImage = `data:image/jpeg;base64,${compressedBase64HighResolution}`;
        image.scaleToFit(1280, 1280); // non-cropping fit inside
      }

      return {
        data: {
          lowResolutionImage: lowResolutionImage || null,
          mediumResolutionImage: mediumResolutionImage || null,
          highResolutionImage: highResolutionImage || null,
        },
      };
    } catch (error) {
      console.error('Failed to process generic IO:', error);
      return {
        data: {
          lowResolutionImage: null,
          mediumResolutionImage: null,
          highResolutionImage: null,
        },
      };
    }
  }
  async processGenericIOTextToImageGeminiTest(
    prompt: string,
  ): Promise<IOGenericTextToImage> {
    try {
      // Ask Gemini for IMAGE output, not just text
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
          // Note: mediaResolution is unreliable; we'll compress programmatically below
        },
      });

      let imageBase64: string | null = null;
      const parts = response?.candidates?.[0]?.content?.parts ?? [];

      for (const part of parts as any[]) {
        if (part?.inlineData?.data) {
          imageBase64 = part.inlineData.data as string;
          break;
        }
      }

      let lowResolutionImage: string | null = null;
      let mediumResolutionImage: string | null = null;
      let highResolutionImage: string | null = null;
      if (imageBase64) {
        // Programmatically reduce size without external services: Jimp resize (fit inside) + JPEG encode
        const inputBuffer = Buffer.from(imageBase64, 'base64');
        const image = await Jimp.read(inputBuffer);
        const thumbnailImageOriginal = image.clone();
        thumbnailImageOriginal.scaleToFit(256, 256); // non-cropping fit inside
        thumbnailImageOriginal.quality(60); // JPEG quality
        const compressedBufferLowResolution =
          await thumbnailImageOriginal.getBufferAsync(Jimp.MIME_JPEG);
        const compressedBase64LowResolution =
          compressedBufferLowResolution.toString('base64');
        lowResolutionImage = `data:image/jpeg;base64,${compressedBase64LowResolution}`;
        // medium resolution
        const mediumResolutionImageOriginal = image.clone();
        mediumResolutionImageOriginal.scaleToFit(512, 512); // non-cropping fit inside
        mediumResolutionImageOriginal.quality(60); // JPEG quality
        const compressedBufferMediumResolution =
          await mediumResolutionImageOriginal.getBufferAsync(Jimp.MIME_JPEG);
        const compressedBase64MediumResolution =
          compressedBufferMediumResolution.toString('base64');
        mediumResolutionImage = `data:image/jpeg;base64,${compressedBase64MediumResolution}`;
        // high resolution
        image.scaleToFit(1280, 1280); // non-cropping fit inside
        image.quality(50); // JPEG quality
        const compressedBufferHighResolution = await image.getBufferAsync(
          Jimp.MIME_JPEG,
        );
        const compressedBase64HighResolution =
          compressedBufferHighResolution.toString('base64');
        highResolutionImage = `data:image/jpeg;base64,${compressedBase64HighResolution}`;
        image.scaleToFit(1280, 1280); // non-cropping fit inside
      }

      return {
        data: {
          lowResolutionImage: lowResolutionImage || null,
          mediumResolutionImage: mediumResolutionImage || null,
          highResolutionImage: highResolutionImage || null,
        },
      };
    } catch (error) {
      console.error('Failed to process generic IO:', error);
      return {
        data: {
          lowResolutionImage: null,
          mediumResolutionImage: null,
          highResolutionImage: null,
        },
      };
    }
  }
  private buildCustomPrompt(schema: any, data: any): string {
    let prompt = '';

    // Extract custom prompt and response format from data object
    const customPrompt = data.custom_prompt;
    const responseFormat = data.response_format;

    // Use the custom prompt if provided
    if (customPrompt) {
      prompt += `${customPrompt}\n\n`;
    }

    // Add input schema information if provided (schema is now an array)
    if (schema && Array.isArray(schema)) {
      prompt += `Input Schema:\n${JSON.stringify(schema, null, 2)}\n\n`;
    }

    // Add the actual input data (excluding the custom prompt and response format to avoid duplication)
    const dataForPrompt = { ...data };
    delete dataForPrompt.custom_prompt;
    delete dataForPrompt.response_format;

    prompt += `Input Data:\n${JSON.stringify(dataForPrompt, null, 2)}\n\n`;

    // Add response format guide if provided
    if (responseFormat) {
      prompt += `Response Format Guide:\n${responseFormat}\n\n`;
    }

    // Always instruct to return HTML
    prompt += `IMPORTANT: Please provide your response in HTML format. ${responseFormat ? 'Follow the response format guide above.' : 'Format the response appropriately for web display.'} Do not include markdown code blocks, just return the HTML directly.

SECURITY REQUIREMENTS:
- DO NOT include any <script> tags or JavaScript code
- DO NOT include any event handler attributes (onclick, onload, onerror, etc.)
- DO NOT include any <iframe>, <object>, <embed> tags
- DO NOT include any <form>, <input>, <button> elements
- DO NOT include any javascript: or data: protocols in href/src attributes
- DO NOT include any HTML comments or hidden content
- Only generate safe, display-oriented HTML content (div, p, h1-h6, span, ul, ol, li, table, img, a, etc.)
- Focus on content presentation and styling, not interactivity`;

    return prompt;
  }
  private buildCustomPromptTextToImage(schema: any, data: any): string {
    let prompt = '';

    // Extract custom prompt and response format from data object
    const customPrompt = data.custom_prompt;
    const responseFormat = data.response_format;

    // Use the custom prompt if provided
    if (customPrompt) {
      prompt += `${customPrompt}\n\n`;
    }

    // Add input schema information if provided (schema is now an array)
    if (schema && Array.isArray(schema)) {
      prompt += `Input Schema:\n${JSON.stringify(schema, null, 2)}\n\n`;
    }

    // Add the actual input data (excluding the custom prompt and response format to avoid duplication)
    const dataForPrompt = { ...data };
    delete dataForPrompt.custom_prompt;
    delete dataForPrompt.response_format;

    prompt += `Input Data:\n${JSON.stringify(dataForPrompt, null, 2)}\n\n`;

    // Add response format guide if provided
    if (responseFormat) {
      prompt += `Response Format Guide:\n${responseFormat}\n\n`;
    }

    // Always instruct to return IMAGE format
    prompt += `IMPORTANT: Please provide your response in IMAGE format`;

    return prompt;
  }
}
