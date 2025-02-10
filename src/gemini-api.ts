import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config();

export class GeminiAPI {
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY || '';
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateSummary(changes: any[]): Promise<string> {
    const prompt = fs.readFileSync(path.join(__dirname, '/prompt/summarize.txt'), 'utf8');

    const model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: prompt,
    });

    const result = await model.generateContent(JSON.stringify(changes));
    const response = await result.response;

    if (!response.text()) {
      throw new Error('No response generated');
    }

    return response
      .text()
      .replace(/```json\n/, '')
      .replace(/\n```/, '');
  }

  async reviewChanges(changes: any[]): Promise<string> {
    const prompt = fs.readFileSync(path.join(__dirname, '/prompt/review.txt'), 'utf8');
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: prompt,
    });

    const result = await model.generateContent(JSON.stringify(changes));
    const response = await result.response;

    if (!response.text()) {
      throw new Error('No response generated');
    }

    return response.text();
  }
}
