export const dynamic = "force-dynamic";

import { getBaseURL } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { ...env } = process.env;
  return NextResponse.json({
    baseUrl: getBaseURL(env.NEXT_PUBLIC_API_URL as string),
  });
}
