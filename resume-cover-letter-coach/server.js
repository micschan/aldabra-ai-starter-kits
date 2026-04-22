import "dotenv/config";
import express from "express";
import OpenAI from "openai";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));

const client = new OpenAI({
  baseURL: "https://aldabra.cloud/v1",
  apiKey: process.env.ALDABRA_API_KEY
});

app.post("/api/coach", async (req, res) => {
  const resume = String(req.body.resume ?? "").trim();
  const job = String(req.body.job ?? "").trim();

  const response = await client.chat.completions.create({
    // Qwen 2.5 72B gives strong writing structure at a low OpenRouter price.
    model: "qwen/qwen-2.5-72b-instruct",
    messages: [
      {
        role: "system",
        content:
          "You are an HR assistant. Return candidate summary, skill matches, gaps, and interview follow-up notes."
      },
      { role: "user", content: `Resume:\n${resume}\n\nJob post:\n${job}` }
    ]
  });

  res.json({ advice: response.choices[0]?.message?.content ?? "No advice returned." });
});

app.listen(port, () => console.log(`Resume coach running on http://localhost:${port}`));
