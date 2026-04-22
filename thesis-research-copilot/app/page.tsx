export default function Page() {
  return (
    <main style={{ fontFamily: "system-ui", margin: "4rem auto", maxWidth: 760 }}>
      <p style={{ color: "#0070f3", fontWeight: 800, letterSpacing: "0.08em" }}>
        Advanced Starter Kit
      </p>
      <h1>Research Brief Generator</h1>
      <p>
        Use the API route at <code>/api/research</code> to ask research questions,
        save the result to Postgres, and inspect the request in Aldabra AI Gateway.
      </p>
    </main>
  );
}
