import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(req) {
  try {
    const { prompt, amount = "1", resolution = "512x512" } = await req.json();
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UnAuthorized", { status: 500 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("Open Ai api key is not configured", {
        status: 500,
      });
    }

    if (!prompt) {
      return new NextResponse("prompt is required", { status: 500 });
    }

    const freetrial = await checkApiLimit();
    if (!freetrial) {
      return new NextResponse("Free trail has expired", { status: 403 });
    }

    const response = await openai.createImage({
      prompt,
      n: parseInt(amount),
      size: resolution,
    });

    await increaseApiLimit();
    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log(`[IMAGE_POST]`);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
