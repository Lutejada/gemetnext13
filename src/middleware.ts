// `middleware.js`
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/change-password/*", "/forgot-password"];

// Función para verificar si la ruta es pública
const isPublicRoute = (path: string) => {
  return publicRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace(/\*/g, ".*")}$`);
    return regex.test(path);
  });
};

// Middleware principal
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const session = await getToken({ req: request });

  // Redirigir a login si no hay sesión y la ruta no es pública
  if (!session && !isPublicRoute(path)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirigir a dashboard si hay sesión y la ruta es pública
  if (session && isPublicRoute(path)) {
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
