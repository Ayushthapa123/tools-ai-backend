import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { GoogleGenAI } from '@google/genai';
import axios from 'axios';

import { DomainNameGeneratorInput } from './dto/dng.input';
import { DNGList } from './models/dng.model';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const API_FREAK_KEY = process.env.API_FREAK_KEY;

@Injectable()
export class DngService {
  constructor(private readonly prismaService: PrismaService) {}

  async generateDomainName(input: DomainNameGeneratorInput): Promise<DNGList> {
    try {
      // Step 1: Generate domain name suggestions using GPT
      const domainSuggestions = await this.generateDomainSuggestions(input);
      console.log('domainSuggestions', domainSuggestions);

      // Step 2: Check availability for each domain suggestion
      const domainsWithAvailability =
        await this.checkDomainAvailability(domainSuggestions);
      console.log('domainsWithAvailability', domainsWithAvailability);

      // Step 3: Format the response
      return this.formatResponse(domainsWithAvailability, input);
    } catch (error) {
      console.error('Error in generateDomainName:', error);
      return {
        success: false,
        message: 'Failed to generate domain names',
        data: [],
        personalizedGuide: '',
      };
    }
  }

  private async generateDomainSuggestions(
    input: DomainNameGeneratorInput,
  ): Promise<string[]> {
    const prompt = `
You are a domain name expert and marketing strategist. Based on the following business details, generate creative and relevant domain name suggestions.

Business Details:
- Name: ${input.businessName}
- Description: ${input.businessDescription} 
- Domain Extension: ${input.domainExtension || '.com'}
- Custom Prompt: ${input.customPrompt || ''}

Please generate 3-9 creative domain name suggestions that are:
1. Brandable and memorable
2. SEO-friendly when possible
3. Easy to spell and pronounce
4. Relevant to the business
5. Available in different variations (with/without hyphens, different extensions)

Output strictly valid JSON array of domain names (without extensions), no extra commentary:
["domain1", "domain2", "domain3", ...]`;

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
      return Array.isArray(parsed) ? parsed.slice(0, 20) : [];
    } catch (error) {
      console.error('Error parsing domain suggestions:', error);
      return [];
    }
  }

  private async checkDomainAvailability(domainNames: string[]): Promise<
    Array<{
      domain: string;
      available: boolean;
      price?: number;
    }>
  > {
    try {
      // Clean domain names and prepare for bulk check
      const cleanDomains = domainNames.map((domainName) =>
        domainName.replace(/\.(com|org|net|io|co|app|dev)$/i, ''),
      );
      const fullDomains = cleanDomains.map((domain) => `${domain}.com`);

      // Use bulk domain availability API (POST to same endpoint)
      const config = {
        method: 'post',
        url: 'https://api.apifreaks.com/v1.0/domain/availability',
        headers: {
          'X-apiKey': API_FREAK_KEY,
          'Content-Type': 'application/json',
        },
        data: {
          domainNames: fullDomains,
        },
      };

      console.log(
        'Sending bulk request with data:',
        JSON.stringify(config.data, null, 2),
      );
      const response = await axios.request(config);
      console.log('Bulk API response:', response.data);

      if (response.data && response.data.bulk_domain_availability_response) {
        return response.data.bulk_domain_availability_response.map(
          (result: any) => ({
            domain: result.domain,
            available: result.domainAvailability || false,
            price: result.price,
          }),
        );
      }

      // Fallback: return all as unavailable if bulk API fails
      return fullDomains.map((domain) => ({
        domain,
        available: false,
        price: undefined,
      }));
    } catch (error) {
      console.error(
        'Bulk domain availability error:',
        error.response?.data || error.message,
      );

      // Prepare domains for alternative formats
      const cleanDomains = domainNames.map((domainName) =>
        domainName.replace(/\.(com|org|net|io|co|app|dev)$/i, ''),
      );
      const fullDomains = cleanDomains.map((domain) => `${domain}.com`);

      // Try multiple alternative formats
      const alternativeFormats = [
        {
          name: 'domainNames (correct format)',
          data: { domainNames: fullDomains },
        },
        { name: 'domains object', data: { domains: fullDomains } },
        { name: 'domain array', data: { domain: fullDomains } },
        { name: 'domainList', data: { domainList: fullDomains } },
        { name: 'bulk_domains', data: { bulk_domains: fullDomains } },
        { name: 'query', data: { query: fullDomains } },
      ];

      for (const format of alternativeFormats) {
        try {
          console.log(`Trying alternative format: ${format.name}...`);
          const altConfig = {
            method: 'post',
            url: 'https://api.apifreaks.com/v1.0/domain/availability',
            headers: {
              'X-apiKey': API_FREAK_KEY,
              'Content-Type': 'application/json',
            },
            data: format.data,
          };

          const altResponse = await axios.request(altConfig);
          console.log(
            `Alternative API response (${format.name}):`,
            altResponse.data,
          );

          if (
            altResponse.data &&
            altResponse.data.bulk_domain_availability_response
          ) {
            console.log(`Success with format: ${format.name}`);
            return altResponse.data.bulk_domain_availability_response.map(
              (result: any) => ({
                domain: result.domain,
                available: result.domainAvailability || false,
                price: result.price,
              }),
            );
          }
        } catch (altError) {
          console.error(
            `Alternative format (${format.name}) failed:`,
            altError.response?.data || altError.message,
          );
        }
      }

      // Fallback: return all as unavailable
      return fullDomains.map((domain) => ({
        domain,
        available: false,
        price: undefined,
      }));
    }
  }

  private formatResponse(
    domainsWithAvailability: Array<{
      domain: string;
      available: boolean;
      price?: number;
    }>,
    input: DomainNameGeneratorInput,
  ): DNGList {
    // Include all domains regardless of availability
    const allDomains = domainsWithAvailability;
    const availableDomains = domainsWithAvailability.filter((d) => d.available);

    // Create single category with all domains
    const domainItems = allDomains.map((d) => ({
      item: d.domain,
      available: d.available,
      price: d.price,
    }));

    const personalizedGuide = this.generatePersonalizedGuide(
      input,
      availableDomains.length,
      domainsWithAvailability.length,
    );

    return {
      success: true,
      message: `Generated ${domainsWithAvailability.length} domain suggestions with ${availableDomains.length} available options`,
      data: [{ category: 'cat', items: domainItems }],
      personalizedGuide,
    };
  }

  private generatePersonalizedGuide(
    input: DomainNameGeneratorInput,
    availableCount: number,
    totalCount: number,
  ): string {
    const availabilityRate =
      totalCount > 0 ? Math.round((availableCount / totalCount) * 100) : 0;

    return `Based on your business "${input.businessName}" (${input.businessDescription}), I've generated ${totalCount} domain name suggestions with ${availableCount} available options (${availabilityRate}% availability rate). The suggestions are categorized by style: unique names for brand differentiation, SEO-friendly options for search visibility, brandable names for memorability, and descriptive names that clearly communicate your business purpose. Consider your target audience and marketing strategy when choosing your final domain.`;
  }
}
