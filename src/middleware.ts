import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    
    console.log("Middleware triggered:", { pathname, hasToken: !!token });
    
    // Auth pages that authenticated users shouldn't access
    const authPages = ["/signin", "/signup", "/forgot-password"];
    const isAuthPage = authPages.some(page => pathname === page);
    
    // Prevent redirect loops - don't redirect if already on signout, signin, or onboarding
    if (pathname === "/signout" || pathname === "/signin" || pathname === "/onboarding") {
      return NextResponse.next();
    }
    
    // Check for invalid session (empty user data)
    if (token && (token.email === '' || token.email === undefined || !token.email)) {
      console.log("Invalid session detected, redirecting to signout");
      return NextResponse.redirect(new URL("/signout", req.url));
    }
    
    // If user is authenticated and trying to access auth pages, redirect to dashboard
    if (token && isAuthPage) {
      console.log("Redirecting authenticated user from auth page to dashboard");
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    
    // If user is not authenticated and trying to access protected routes, redirect to signin
    if (!token && !isAuthPage && pathname !== "/" && pathname !== "/terms" && pathname !== "/privacy") {
      console.log("Redirecting unauthenticated user to signin");
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    
    // Check profile completion for authenticated users accessing protected routes
    if (token && !isAuthPage && pathname !== "/" && pathname !== "/terms" && pathname !== "/privacy") {
      try {
        const response = await fetch(new URL("/api/user/profile-status", req.url), {
          headers: {
            cookie: req.headers.get("cookie") || "",
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          if (!data.profileCompleted) {
            console.log("Profile not completed, redirecting to onboarding");
            return NextResponse.redirect(new URL("/onboarding", req.url));
          }
        }
      } catch (error) {
        console.error("Error checking profile completion:", error);
        // Continue without redirecting if there's an error
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        console.log("Authorized callback:", { pathname, hasToken: !!token });
        
        // Public routes that don't require authentication
        const publicRoutes = [
          "/",
          "/signin",
          "/signup", 
          "/forgot-password",
          "/terms",
          "/privacy",
          "/api/auth"
        ];
        
        // Check if the current path is public
        const isPublicRoute = publicRoutes.some(route => 
          pathname === route || pathname.startsWith(route)
        );
        
        // Allow access to public routes
        if (isPublicRoute) {
          return true;
        }
        
        // Require authentication for all other routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
