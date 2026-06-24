import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function askAI(userMessage, systemPrompt = "Você é um assistente útil") {
  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-20b",
      temperature: 0.7,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Erro na API da OpenAI", error);
  }
}

const resposta = await askAI("Explique o que é o API em uma frase.");
console.log(resposta);
