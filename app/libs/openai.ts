import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const globalForOpenAI = global as unknown as {
  openai: OpenAIApi | undefined
}

export const openai = globalForOpenAI.openai ?? new OpenAIApi(configuration);

if (process.env.NODE_ENV !== 'production') {
  globalForOpenAI.openai = openai
}