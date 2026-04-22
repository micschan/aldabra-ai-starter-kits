import "dotenv/config";
import express from "express";
import OpenAI from "openai";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(express.json({ limit: "1mb" }));

const client = new OpenAI({
  // This baseURL lets the OpenAI SDK send requests through Aldabra AI Gateway.
  baseURL: "https://aldabra.cloud/v1",

  // The browser never sees this key because only the Express server reads .env.
  apiKey: process.env.ALDABRA_API_KEY
});

app.post("/api/study-guide", async (req, res) => {
  try {
    const notes = String(req.body.notes ?? "").trim();

    if (notes.length < 20) {
      res.status(400).json({ error: "Paste longer class notes before generating a guide." });
      return;
    }

    const response = await client.chat.completions.create({
      // premium-chat is better for structured summarization than the cheapest route.
      model: "premium-chat",
      messages: [
        {
          role: "system",
          // Asking for JSON makes the frontend easier to render consistently.
          content:
            "Return valid JSON with keys: summary, flashcards, quiz. flashcards and quiz should be arrays."
        },
        {
          role: "user",
          // The student's notes are the source material. Keep this under your project context limit.
          content: notes
        }
      ]
    });

    const content = response.choices[0]?.message?.content ?? "{}";

    // Keep parsing simple for the starter. A production app should validate the shape.
    res.json({ raw: content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to generate study guide." });
  }
});

app.listen(port, () => {
  console.log(`Study coach API running on http://localhost:${port}`);
});
