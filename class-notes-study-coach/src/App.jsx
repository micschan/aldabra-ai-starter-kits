import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const notes = form.get("notes");
    const output = document.querySelector("#output");

    output.textContent = "Generating study guide...";

    const response = await fetch("/api/study-guide", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes })
    });

    const data = await response.json();
    output.textContent = data.raw ?? data.error ?? "No response.";
  }

  return (
    <main>
      <section className="panel">
        <p className="eyebrow">Intermediate Starter Kit</p>
        <h1>Class Notes Study Coach</h1>
        <p>
          Paste lecture notes and generate summaries, flashcards, and quiz questions
          through one Aldabra AI Gateway request.
        </p>

        <form onSubmit={handleSubmit}>
          <textarea
            name="notes"
            defaultValue="Photosynthesis converts light energy into chemical energy. Chlorophyll absorbs sunlight, and plants use carbon dioxide and water to produce glucose and oxygen."
          />
          <button type="submit">Generate study guide</button>
        </form>

        <pre id="output" />
      </section>
    </main>
  );
}

createRoot(document.querySelector("#root")).render(<App />);
