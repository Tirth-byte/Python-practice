import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const appRoutes = [
    "/dashboard",
    "/my-learning",
    "/learn",
    "/practice",
    "/projects",
    "/community",
    "/leaderboard",
    "/profile",
    "/settings",
  ];

  const isAppRoute = appRoutes.some(route => pathname.startsWith(route));

  if (isAppRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    // Keep track of original url if needed
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.href);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
