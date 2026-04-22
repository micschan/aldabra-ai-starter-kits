import "dotenv/config";
import express from "express";
import OpenAI from "openai";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());
app.use(express.static("public"));

const client = new OpenAI({
  // This line connects your app to Aldabra's PH servers instead of calling providers one by one.
  baseURL: "https://aldabra.cloud/v1",

  // Keep your key in .env so it is never exposed to browser code or committed to GitHub.
  apiKey: process.env.ALDABRA_API_KEY
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = String(req.body.message ?? "").trim();

    if (!message) {
      res.status(400).json({ error: "Please send a question." });
      return;
    }

    const response = await client.chat.completions.create({
      // fast-chat is a low-cost model that is good for first projects and simple Q&A.
      model: "fast-chat",
      messages: [
        // The system message keeps the assistant focused on the local-service use case.
        {
          role: "system",
          content:
            "You answer barangay service questions in simple Filipino-English. If unsure, tell the user to confirm with the barangay office."
        },

        // The user's message is passed as the actual question to answer.
        { role: "user", content: message }
      ]
    });

    // Return only the assistant answer so the frontend stays easy to understand.
    res.json({ answer: response.choices[0]?.message?.content ?? "No answer returned." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to contact the AI gateway." });
  }
});

app.listen(port, () => {
  console.log(`Barangay chatbot running on http://localhost:${port}`);
});
