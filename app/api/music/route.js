import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UnAuthorized", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("prompt is required", { status: 500 });
    }

    const freetrial = await checkApiLimit();
    if (!freetrial) {
      return new NextResponse("Free trail has expired", { status: 403 });
    }

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
        },
      }
    );
    await increaseApiLimit();
    return NextResponse.json(response);
  } catch (error) {
    console.log(`[MUSIC_POST]`);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
