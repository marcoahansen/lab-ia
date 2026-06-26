import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY, // precisa ser uma api key da open
})

const documentoRH = [
  "A regra de reembolso de refeição permite até R$ 55,00 por dia útil.",
  "Para solicitar férias, o colaborador deve avisar o RH com 45 dias de antecedência.",
  "O plano de saúde cobre dependentes diretos com coparticipação de 20%."
];

async function rodarIngestao() {
  console.log("Gerando embeddings...")
  for (const paragrafo of documentoRH) {
    // Gerar o vetor (embedding)
    try {
      const resposta = await client.embeddings.create({
        model: 'text-embedding-3-small', // só disponível na api da openai
        input: paragrafo,
      })

      const vetor = resposta.data[0].embedding;

      console.log(`Vetor gerado: "${vetor} \n Paragrafo: "${paragrafo}"`)
    } catch (error) {
      console.error("Erro na API", error)
    }
  }
  console.log("Ingestão concluída!")
}

rodarIngestao()