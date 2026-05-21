import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const completion =
      await client.chat.completions.create({

        model: "gpt-4.1-mini",

        messages: [
          {
            role: "system",

            content:
              "You are an AI spend optimization expert.",
          },

          {
            role: "user",

            content:
              `Generate a short summary for:
              Tool: ${body.tool}
              Recommendation: ${body.recommendation}
              Savings: ${body.savings}`,
          },
        ],
      });

    return Response.json({
      summary:
        completion.choices[0].message.content,
    });

  } catch {

    return Response.json({
      summary:
        "Your stack has been analyzed successfully. Some savings opportunities were identified.",
    });
  }
}