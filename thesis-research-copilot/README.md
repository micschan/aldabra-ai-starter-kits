# Research Brief Generator

Advanced starter project for a research brief workflow using Next.js, Postgres, and Aldabra AI Gateway.

## What you build

A research endpoint that:

- accepts a market or product research question
- asks a stronger model for structured guidance
- stores the question and answer in Postgres
- gives you a base for request history and cost-aware workflows

## Run locally

```bash
npm install
cp .env.example .env
psql "$DATABASE_URL" -f schema.sql
npm run dev
```

Open:

```text
http://localhost:3000
```

## Test the API route

```bash
curl -X POST http://localhost:3000/api/research \
  -H "Content-Type: application/json" \
  -d "{\"question\":\"What are the adoption risks for AI chat support in local SMEs?\"}"
```
