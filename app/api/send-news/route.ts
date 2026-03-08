import { inngest } from "@/lib/inngest/client";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/better-auth/auth";
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { symbol, company } = await req.json();

    const session = await auth?.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "User email not found" },
        { status: 401 }
      );
    }

    await inngest.send({
      name: "stock/news.email",
      data: {
        symbol,
        company,
        email: session.user.email,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("send-news route error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to send event" },
      { status: 500 }
    );
  }
}