import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://admin.easyparkingltd.com/api/v1/service-types', {
      headers: {
        'Accept': 'application/json',
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error('Error proxying service-types request:', error);
    const status = error.response?.status || 500;
    const message = error.response?.data || error.message || 'Server error proxying service types';
    return NextResponse.json(
      { error: true, message },
      { status }
    );
  }
}
