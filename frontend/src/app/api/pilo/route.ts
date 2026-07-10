import { NextResponse } from "next/server";
import { generatePiloAdvice } from "../../services/openai/openai.service";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const advice = await generatePiloAdvice(data);

    return NextResponse.json({
      success: true,
      advice,
    });
  } catch (error) {
    console.error("Erreur API Pilo :", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur OpenAI",
      },
      { status: 500 }
    );
  }
}