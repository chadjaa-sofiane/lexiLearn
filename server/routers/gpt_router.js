import { Router } from "express";
import OpenAI from "openai";
import { config } from "dotenv";
config();

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

const gptRouter = Router();
gptRouter.post("/gpt", async (req, res) => {
  try {
    const text = req.body.text;
    const type = req.body.type;

    if (!text || !type) {
      return res.status(400).json({
        data: null,
        error:
          "Both 'text' and 'type' fields should be populated in the request's body",
      });
    }

    const prompts = {
      word: `
              Define ${text}, including a comprehensive definition and examples. Provide at least 50 words for the definition. Return the result in JSON format with fields:
                definition: string
                , examples: string[]
                , correct_word: string
                , synonyms: string[]
                , usage: string (when to use this word and how formal it is and what you suggest to use instead for different occasions)
                , more: string (anything else you want to say as GPT)
              `,
      sentence: `
                 Interpret the following sentence: ${text}. Provide a comprehensive explanation of its meaning under the meaning field. Ensure the explanation includes at least 50 words. Return the result in JSON format with the following fields:
                 , correct_sentence: string
                 , meaning: string
                 , formality: string (how formal or informal the sentence is)
                 , suggestions: string (better ways to express the sentence)
                 , more: string (additional insights or context you can provide)
               `,
      question: `
                Suggest the most appropriate word for the context: ${text}. Provide the word and a brief explanation of why it's suitable. Include its formality and other word suggestions with their formalities. Return the result in JSON format with fields:
                word: string
                , explanation: string
                , formality: string
                , other_suggestions: [{ word: string, formality: string }]
  `,
    };
    const gptPrompt = prompts[type];
    if (!gptPrompt) {
      return res.status(400).json({
        data: null,
        error: "'type' should be either 'word' or 'sentence'",
      });
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: gptPrompt,
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
