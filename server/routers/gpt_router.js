import { Router } from "express";
import OpenAI from "openai";
import { config } from "dotenv";
config()

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

const gptRouter = Router();

gptRouter.post("/gpt", async (req, res) => {
  try {
    const word = req.body.word;
    if (!word) {
      return res.status(400).json({
        data: null,
        error: "the word field should be populated in the request's body",
      });
    }
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
                    Define ${word}, including a comprehensive definition and examples. Provide at least 50 words for the definition. Return the result in JSON format with fields:
                    definition: string
                    , examples: string[]
                    , correct_word: string
                    , synonyms: string[]
                    , usage: string (when to use this word and how formal it is and what you suggest to use instead for different occasions)
                    , more: string (anything else you want to say as GPT)
                    `,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    const jsonData = JSON.parse(completion.choices[0].message.content);
    res.status(200).json({ data: jsonData, error: null });
  } catch (error) {
    res.status(500);
  }
});

export default gptRouter;
