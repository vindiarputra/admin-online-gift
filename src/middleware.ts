import { clerkClient, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/banners", "/categories", "/products", "/"]);

export default clerkMiddleware(
	async (auth, req) => {
		// Skip middleware for sign-in page to prevent redirect loops
		if (req.nextUrl.pathname === "/sign-in" || req.nextUrl.pathname === "/sign-up") {
			return NextResponse.next();
		}

		const { userId } = auth();

		// if (req.nextUrl.pathname.startsWith("/api") && !userId && req.method !== "GET") {
		// 	return NextResponse.json(
		// 		{ error: "Unauthorized - Please sign in to access this resource" },
		// 		{ status: 401 }
		// 	);
		// }

		if (userId) {
			const user = await clerkClient().users.getUser(userId);
			const role = (user.publicMetadata.role as string) || undefined;

			// Redirect non-admins trying to access protected routes
			if (isProtectedRoute(req) && role !== "admin") {
				return NextResponse.redirect(new URL("/sign-in", req.url));
			}
			// Allow access if user is authenticated and has required role
			return NextResponse.next();
		}

		// Redirect unauthenticated users to sign-in
		return NextResponse.redirect(new URL("/sign-in", req.url));
	},
	{ afterSignInUrl: "/" }
);

export const config = {
	matcher: [
		"/((?!.*\\..*|_next|/sign-in).*)", // Exclude static files and `/sign-in`
		"/", // Middleware applies to index page
		"/(api|trpc)(.*)", // Middleware applies to API routes
	],
};
