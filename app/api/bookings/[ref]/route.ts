import { NextResponse } from 'next/server';
import axios from 'axios';

export const runtime = 'edge';

const BACKEND_URL = process.env.BACKEND_URL || 'https://admin.easyparkingltd.com';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ ref: string }> }
) {
  try {
    const { ref } = await params;
    const response = await axios.get(`${BACKEND_URL}/api/v1/bookings/${ref}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error(`Error proxying booking GET request:`, error);
    const status = error.response?.status || 500;
    const message = error.response?.data || error.message || 'Server error fetching booking';
    return NextResponse.json(
      { error: true, message },
      { status }
    );
  }
}
