// `middleware.js`
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log(request.nextUrl.hostname.split(".")[0]);
  const session = await getToken({ req: request });
  console.log({ session });
  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: "/dashboard/:path*" };
