import { NextResponse } from "next/server";
import { aldabra } from "../../../lib/aldabra";
import { pool } from "../../../lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const question = String(body.question ?? "").trim();

  if (question.length < 10) {
    return NextResponse.json(
      { error: "Ask a longer research question." },
      { status: 400 }
    );
  }

  const model = "claude-sonnet";
  const response = await aldabra.chat.completions.create({
    // Claude Sonnet is useful for longer, structured writing and research planning.
    model,

    // Low temperature keeps the answer focused and easier to compare across revisions.
    temperature: 0.2,

    messages: [
      {
        role: "system",
        // The system message defines the quality bar for the assistant.
        content:
          "Act as a careful thesis research assistant. Provide outlines, source-comparison guidance, and next steps."
      },
      {
        role: "user",
        // The student's question becomes the user prompt sent through Aldabra.
        content: question
      }
    ]
  });

  const answer = response.choices[0]?.message?.content ?? "No answer returned.";

  await pool.query(
    // Saving the request makes it easy to build a history page later.
    "INSERT INTO research_requests (question, answer, model) VALUES ($1, $2, $3)",
    [question, answer, model]
  );

  return NextResponse.json({ answer, model });
}
