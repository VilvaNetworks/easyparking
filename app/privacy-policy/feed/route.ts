export const runtime = 'edge';

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Extract URL to create a relative redirect or redirect to the base URL
  const { origin } = new URL(request.url);
  return NextResponse.redirect(`${origin}/privacy-policy`, 301);
}
