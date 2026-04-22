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

app.post("/api/action-tracker", async (req, res) => {
  try {
    const notes = String(req.body.notes ?? "").trim();

    if (notes.length < 20) {
      res.status(400).json({ error: "Paste longer meeting notes before generating a tracker." });
      return;
    }

    const response = await client.chat.completions.create({
      // Qwen 2.5 72B is a low-cost OpenRouter model that is strong for structured operational outputs.
      model: "qwen/qwen-2.5-72b-instruct",
      messages: [
        {
          role: "system",
          // Asking for JSON makes the frontend easier to render consistently.
          content:
            "Return valid JSON with keys: summary, decisions, actionItems, risks, followUps. Arrays should be arrays."
        },
        {
          role: "user",
          // The meeting notes are the source material. Keep this under your project context limit.
          content: notes
        }
      ]
    });

    const content = response.choices[0]?.message?.content ?? "{}";

    // Keep parsing simple for the starter. A production app should validate the shape.
    res.json({ raw: content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to generate action tracker." });
  }
});

app.listen(port, () => {
  console.log(`Action tracker API running on http://localhost:${port}`);
});
