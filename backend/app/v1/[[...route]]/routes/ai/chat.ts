import { Hono } from "hono";
import { createTogetherAI } from "@ai-sdk/togetherai";
import { streamText } from "ai";

const chat = new Hono();

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
console.log("TOGETHER_AI_API_KEY", process.env.TOGETHER_AI_API_KEY);
const togetherai = createTogetherAI({
  apiKey: process.env.TOGETHER_AI_API_KEY ?? "",
});

chat.post("/", async (c) => {
  const { messages } = await c.req.json();
  const result = streamText({
    model: togetherai("meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo"),
    messages,
  });

  return result.toDataStreamResponse({
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Encoding": "none",
    },
  });
});

export default chat;
