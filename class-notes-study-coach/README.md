# Meeting Notes Action Tracker

Intermediate project for turning meeting notes into summaries, decisions, risks, and action items.

## What you build

A React app with an Express backend that:

- accepts pasted meeting notes
- calls Aldabra AI Gateway from the backend
- returns structured operational follow-ups
- shows how to keep AI keys outside browser code

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Open:

```text
http://localhost:5173
```

## Notes for teams

The backend asks the model to return JSON. In a production app, validate and parse that JSON before saving it.
