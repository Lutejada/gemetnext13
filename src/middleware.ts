// `middleware.js`
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/"];
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const subDomain = request.nextUrl.hostname.split(".")[0];
  const path = request.nextUrl.pathname;
  console.log({ path });
  const session = await getToken({ req: request });
  console.log({ session });
  if (!session && !publicRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && publicRoutes.includes(request.nextUrl.pathname)) {
    console.log("entro");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

// export const config = { matcher: "/dashboard/:path*" };
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};
