import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Legge il cookie dell'utente
  const userCookie = req.cookies.get('user');

  if (!userCookie) {
    // Se l'utente non è autenticato, reindirizza alla pagina di login
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  try {
    const user = JSON.parse(userCookie.value);

    // Protezione delle rotte specifiche
    if (req.nextUrl.pathname.startsWith('/admin/dashboard') && user.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    if (req.nextUrl.pathname.startsWith('/organizzazione/dashboard') && user.role !== 'organizzatore') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  } catch (error) {
    console.error('Errore nel parsing del cookie:', error);
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Se tutto è valido, continua
  return NextResponse.next();
}

// Configura le rotte dove il middleware è attivo
export const config = {
  matcher: [
    '/admin/dashboard/:path*',       // Protegge tutte le rotte sotto admin/dashboard
    '/organizzazione/dashboard/:path*', // Protegge tutte le rotte sotto organizzazione/dashboard
  ],
};
