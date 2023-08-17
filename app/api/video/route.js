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

    const output = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt
        }
      }
    );

    return NextResponse.json(output);
  } catch (error) {
    console.log(`[MUSIC_POST]`);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
