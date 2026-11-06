import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isInstructorRoute = req.nextUrl.pathname.startsWith("/instructor");

    if (isInstructorRoute) {
      const userRole = token?.role;
      if (userRole !== "INSTRUCTOR" && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/login?error=Unauthorized", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/instructor/:path*"],
};

