import OpenAI from "openai";
import fs from 'fs/promises';

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function analisar() {
  try {
    const img = await fs.readFile('./nota-fiscal.jpg', { encoding: 'base64' });
    const res = await client.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [{
        role: "user", content: [
          { type: "text", text: 'Extraia o valor desta nota.' },
          { type: "image_url", image_url: { url: `data:image/jpeg;base64,${img}` } }
        ]
      }]
    })
    console.log(res.choices[0].message.content)
  } catch (error) {
    console.error(error)
  }
}

analisar()