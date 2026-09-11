import { NextResponse } from "next/server";
import { paddle } from "@/lib/paddle/server";

export async function GET() {
  try {
    const customers = paddle.customers.list();

    const firstPage = await customers.next();

    return NextResponse.json({
      ok: true,
      customerCount: firstPage.length,
    });
  } catch (error) {
    console.error("Paddle test failed:", error);

    return NextResponse.json(
      { ok: false, error: "Paddle API request failed" },
      { status: 500 },
    );
  }
}
