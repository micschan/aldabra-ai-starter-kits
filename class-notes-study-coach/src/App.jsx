import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const notes = form.get("notes");
    const output = document.querySelector("#output");

    output.textContent = "Generating study guide...";

    const response = await fetch("/api/action-tracker", {
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
        <h1>Meeting Notes Action Tracker</h1>
        <p>
          Paste meeting notes and generate summaries, decisions, risks, and action items
          through one Aldabra AI Gateway request.
        </p>

        <form onSubmit={handleSubmit}>
          <textarea
            name="notes"
            defaultValue="We agreed to launch the beta next Friday. Ana owns QA, Marco owns payment testing, and the team is concerned about onboarding emails."
          />
          <button type="submit">Generate action tracker</button>
        </form>

        <pre id="output" />
      </section>
    </main>
  );
}

createRoot(document.querySelector("#root")).render(<App />);
