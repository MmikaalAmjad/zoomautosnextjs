import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    // Fetch email from your backend server
    const response = await axios.get('https://zoomautos.co.uk/api/LogisticsEmail', {
      params: {
        _t: new Date().getTime(), // prevent caching
      },
    });

    // Extract email from response
    const email = response.data?.email || '';

    return NextResponse.json({ email }, { status: 200 });
  } catch (error: any) {
    console.error('❌ Error fetching email:', error.response?.data || error.message);
    return NextResponse.json(
      {
        message: 'Error fetching email',
        error: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
