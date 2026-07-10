import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export const runtime = 'edge';

const BACKEND_URL = process.env.BACKEND_URL || 'https://admin.easyparkingltd.com';

export async function GET(request: NextRequest) {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/pricing`, {
      params: {
        service_type: request.nextUrl.searchParams.get('service_type'),
        dropoff: request.nextUrl.searchParams.get('dropoff'),
        pickup: request.nextUrl.searchParams.get('pickup'),
      },
      headers: {
        'Accept': 'application/json',
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error('Error proxying pricing request:', error);
    const status = error.response?.status || 500;
    const message = error.response?.data || error.message || 'Server error proxying pricing quote';
    return NextResponse.json(
      { error: true, message },
      { status }
    );
  }
}
