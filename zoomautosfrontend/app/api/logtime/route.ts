import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    // Fetch timing data from your backend server
    const response = await axios.get('https://zoomautos.co.uk/api/LogTime', {
      params: {
        _t: new Date().getTime(), // prevent caching
      },
    });

    const timings = response.data || [];

    return NextResponse.json(timings, { status: 200 });
  } catch (error: any) {
    console.error('❌ Error fetching timings:', error.response?.data || error.message);
    return NextResponse.json(
      {
        message: 'Error fetching timings',
        error: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
