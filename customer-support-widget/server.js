import "dotenv/config";
import express from "express";
import OpenAI from "openai";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());
app.use(express.static("public"));

const client = new OpenAI({
  // Aldabra exposes OpenAI-compatible chat completions through one PH-friendly endpoint.
  baseURL: "https://aldabra.cloud/v1",
  apiKey: process.env.ALDABRA_API_KEY
});

app.post("/api/support", async (req, res) => {
  const question = String(req.body.question ?? "").trim();

  if (!question) {
    res.status(400).json({ error: "Please enter a customer question." });
    return;
  }

  const response = await client.chat.completions.create({
    // DeepSeek Chat V3 is low-cost and practical for short support conversations.
    model: "deepseek/deepseek-chat-v3-0324",
    messages: [
      {
        role: "system",
        content:
          "You are a friendly support agent. Answer briefly, ask for an order number when needed, and never invent company policies."
      },
      { role: "user", content: question }
    ]
  });

  res.json({ answer: response.choices[0]?.message?.content ?? "No answer returned." });
});

app.listen(port, () => console.log(`Support widget running on http://localhost:${port}`));
