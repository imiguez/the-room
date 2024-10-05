import { getSession } from "cookie-handler";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getSession();
  return NextResponse.json({ session });
}