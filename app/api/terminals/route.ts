import { NextResponse } from 'next/server';
import axios from 'axios';

export const runtime = 'edge';

const BACKEND_URL = process.env.BACKEND_URL || 'https://admin.easyparkingltd.com';

export async function GET() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/terminals`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error('Error proxying terminals request:', error);
    const status = error.response?.status || 500;
    const message = error.response?.data || error.message || 'Server error proxying terminals';
    return NextResponse.json(
      { error: true, message },
      { status }
    );
  }
}
