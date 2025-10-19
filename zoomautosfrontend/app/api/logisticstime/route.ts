import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    // Fetch contact number from your backend server
    const response = await axios.get('https://zoomautos.co.uk/api/LogisticsContact', {
      params: {
        _t: new Date().getTime(), // prevent caching
      },
    });

    // Extract contact number from response
    const contactNo = response.data?.contactNo || '';

    return NextResponse.json({ contactNo }, { status: 200 });
  } catch (error: any) {
    console.error('❌ Error fetching contact number:', error.response?.data || error.message);
    return NextResponse.json(
      {
        message: 'Error fetching contact number',
        error: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
