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
    const { messages } = await req.json();
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UnAuthorized", { status: 400 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("Open Ai api key is not configured", {
        status: 500,
      });
    }

    if (!messages) {
      return new NextResponse("Messages is required", { status: 400 });
    }

    const freetrial = await checkApiLimit();
    if (!freetrial) {
      return new NextResponse("Free trail has expired", { status: 403 });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    await increaseApiLimit()

    return NextResponse.json(response.data.choices?.[0].message);
  } catch (error) {
    console.log(`[CONVERSATION_POST]`);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
