import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const askGemini = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({
       model: "gemini-3-flash-preview",
    });

    const result = await model.generateContent(prompt);

    // ✅ CORRECT WAY
    const response = result.response.text();

    return response;

  } catch (error) {
    console.log("Gemini AI Error:", error);
    return "Sorry, AI is not responding right now.";
  }
};


export default askGemini