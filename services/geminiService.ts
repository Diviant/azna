
import { GoogleGenAI } from "@google/genai";

// Advice on tattoo styles and placements
export const getTattooAdvice = async (userDescription: string) => {
  // Initialize GoogleGenAI inside the function to use the most up-to-date API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Пользователь хочет татуировку: "${userDescription}". 
      Как профессиональный тату-мастер, кратко предложи стили, особенности расположения и сложность. 
      Отвечай на русском языке. Будь брутальным, но профессиональным. Максимум 60 слов.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Не удалось получить совет от AI. Обсудим при личной встрече.";
  }
};

// Advice on tattoo aftercare for specific areas
export const getAftercareAdvice = async (area: string) => {
  // Initialize GoogleGenAI inside the function to use the most up-to-date API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Дай 3 конкретных совета по уходу за новой татуировкой на зоне: ${area}. 
      Отвечай на русском языке коротким списком.`,
    });
    return response.text;
  } catch (error) {
    return "Держи в чистоте, мажь пантенолом и не чеши!";
  }
};
