import "dotenv/config";
import express from "express";
import OpenAI from "openai";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());
app.use(express.static("public"));

const client = new OpenAI({
  baseURL: "https://aldabra.cloud/v1",
  apiKey: process.env.ALDABRA_API_KEY
});

app.post("/api/analyze", async (req, res) => {
  const review = String(req.body.review ?? "").trim();

  const response = await client.chat.completions.create({
    // DeepSeek Chat V3 keeps classification costs low for repeatable business tasks.
    model: "deepseek/deepseek-chat-v3-0324",
    messages: [
      {
        role: "system",
        content:
          "Return JSON with sentiment, urgency, summary, and recommendedAction for an ecommerce review."
      },
      { role: "user", content: review }
    ]
  });

  res.json({ result: response.choices[0]?.message?.content ?? "{}" });
});

app.listen(port, () => console.log(`Sentiment analyzer running on http://localhost:${port}`));
