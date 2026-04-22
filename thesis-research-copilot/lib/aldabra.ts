import OpenAI from "openai";

export const aldabra = new OpenAI({
  // This line points the OpenAI SDK at Aldabra's OpenAI-compatible gateway.
  baseURL: "https://aldabra.cloud/v1",

  // Store this value in .env. Never expose it in a Client Component.
  apiKey: process.env.ALDABRA_API_KEY
});
