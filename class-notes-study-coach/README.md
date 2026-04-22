# Class Notes Study Coach

Intermediate project for turning class notes into summaries, flashcards, and quiz questions.

## What you build

A React app with an Express backend that:

- accepts pasted lecture notes
- calls Aldabra AI Gateway from the backend
- returns structured study material
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

## Demo video placeholder

Add your 30-second Loom or YouTube embed here.

## Notes for students

The backend asks the model to return JSON. In a production app, validate and parse that JSON before saving it.
