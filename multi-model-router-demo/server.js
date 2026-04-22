import "dotenv/config";
import express from "express";
import OpenAI from "openai";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());
app.use(express.static("public"));

const allowedModels = new Set([
  "deepseek/deepseek-chat-v3-0324",
  "qwen/qwen-2.5-72b-instruct",
  "google/gemini-2.5-flash-lite",
  "deepseek/deepseek-r1-distill-qwen-32b"
]);

const client = new OpenAI({
  // One endpoint stays the same even when the selected model changes.
  baseURL: "https://aldabra.cloud/v1",
  apiKey: process.env.ALDABRA_API_KEY
});

app.post("/api/compare", async (req, res) => {
  const prompt = String(req.body.prompt ?? "").trim();
  const model = String(req.body.model ?? "");

  if (!allowedModels.has(model)) {
    res.status(400).json({ error: "Choose one of the supported demo models." });
    return;
  }

  const startedAt = Date.now();
  const response = await client.chat.completions.create({
    // This is the only line that changes when you route to another model.
    model,
    messages: [{ role: "user", content: prompt }]
  });

  res.json({
    model,
    latencyMs: Date.now() - startedAt,
    answer: response.choices[0]?.message?.content ?? "No answer returned."
  });
});

app.listen(port, () => console.log(`Multi-model demo running on http://localhost:${port}`));
