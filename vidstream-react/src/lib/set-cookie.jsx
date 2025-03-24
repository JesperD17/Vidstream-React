import { NextResponse } from 'next/server'

export function middleware(request) {
    const accessToken = request.cookies.get('access-token')?.value;

    console.log('Access Token:', accessToken);

    if (!accessToken) {
        // If there's no token, redirect to login page
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const response = NextResponse.next();
    
    // Set cookie with secure attributes
    response.cookies.set('access-token', 'YourSecretToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'strict',
    });

    return response;
}

// Apply the middleware to specific paths
export const config = {
    matcher: ['/dashboard/:path*'], // Only apply middleware to protected routes
};
