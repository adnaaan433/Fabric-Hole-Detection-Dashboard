import { GoogleGenAI, Type } from "@google/genai";
import { MetricData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateEfficiencyReport = async (metrics: MetricData, gsm: number, width: number): Promise<string> => {
  try {
    const prompt = `
      Analyze the following production data from a fabric defect detection system.
      
      Parameters:
      - Fabric GSM: ${gsm}
      - Fabric Width: ${width} inches
      
      Current Metrics:
      - Total Holes Detected: ${metrics.holes}
      - Sewing Lines Detected: ${metrics.sewingLines}
      - Total Wastage: ${metrics.totalWastageKg.toFixed(3)} kg
      - Wastage Percentage: ${metrics.wastagePercentage.toFixed(2)}%

      Provide a concise 3-sentence summary of the production quality. 
      Flag if the wastage percentage is critically high (assume > 5% is critical).
      Suggest one immediate action if defects are present.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        maxOutputTokens: 150,
        temperature: 0.7,
      }
    });

    return response.text || "Analysis unavailable.";
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return "AI Analysis failed. Please check your network connection.";
  }
};

export const checkAnomaly = async (currentWastage: number): Promise<{isAnomaly: boolean, reason: string}> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Current fabric wastage is ${currentWastage}%. Is this considered an anomaly in standard textile manufacturing? Return JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isAnomaly: { type: Type.BOOLEAN },
            reason: { type: Type.STRING }
          }
        }
      }
    });
    
    const text = response.text;
    if (!text) return { isAnomaly: false, reason: "No data" };
    
    return JSON.parse(text);
  } catch (e) {
    return { isAnomaly: false, reason: "Error checking anomaly" };
  }
}
