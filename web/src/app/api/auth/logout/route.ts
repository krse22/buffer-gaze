import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_KEYS } from "@/constants";
import { getBaseUrl } from "@/utils/get-base-url";

export async function GET(request: Request) {
  const baseUrl = getBaseUrl(request);

  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_KEYS.ACCESS_TOKEN);
  cookieStore.delete(COOKIE_KEYS.REFRESH_TOKEN);
  cookieStore.delete(COOKIE_KEYS.ORGANIZATION_ID);

  return NextResponse.redirect(new URL("/login", baseUrl));
}
