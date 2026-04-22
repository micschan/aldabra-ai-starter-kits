# Aldabra AI Gateway Starter Examples

Runnable starter projects for students and junior developers using the Aldabra AI Gateway.

## Projects

- `barangay-services-chatbot` - beginner HTML + Express chatbot.
- `customer-support-widget` - beginner support assistant for product FAQs.
- `resume-cover-letter-coach` - beginner applicant screening assistant.
- `class-notes-study-coach` - intermediate React + Express meeting notes action tracker.
- `product-review-sentiment-analyzer` - intermediate review classification app.
- `thesis-research-copilot` - advanced Next.js + Postgres research brief generator.
- `multi-model-router-demo` - advanced model-switching demo across low-cost OpenRouter routes.

## Low-cost OpenRouter models used

- `deepseek/deepseek-chat-v3-0324`
- `qwen/qwen-2.5-72b-instruct`
- `google/gemini-2.5-flash-lite`
- `deepseek/deepseek-r1-distill-qwen-32b`

Each project includes:

- `.env.example`
- setup commands
- annotated code

## Required API key

Create a workspace and API key in Aldabra AI Gateway, then set:

```bash
ALDABRA_API_KEY=your_project_key_here
```

All examples use the OpenAI SDK with Aldabra's OpenAI-compatible endpoint:

```text
https://aldabra.cloud/v1
```
