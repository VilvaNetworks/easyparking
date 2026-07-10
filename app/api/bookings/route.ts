import { NextResponse } from 'next/server';
import axios from 'axios';

export const runtime = 'edge';

const BACKEND_URL = process.env.BACKEND_URL || 'https://admin.easyparkingltd.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await axios.post(`${BACKEND_URL}/api/v1/bookings`, body, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error('Error proxying booking request:', error);
    const status = error.response?.status || 500;
    const message = error.response?.data || error.message || 'Server error proxying booking';
    return NextResponse.json(
      { error: true, message },
      { status }
    );
  }
}
