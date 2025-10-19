import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    // Fetch location data from your backend server
    const response = await axios.get('https://zoomautos.co.uk/api/LogisticsLocation', {
      params: {
        _t: new Date().getTime(), // prevent caching
      },
    });

    // Extract data
    const locationUrl = response.data?.locationUrl || '';
    const address = response.data?.address || '';

    return NextResponse.json({ locationUrl, address }, { status: 200 });
  } catch (error: any) {
    console.error('❌ Error fetching location data:', error.response?.data || error.message);
    return NextResponse.json(
      {
        message: 'Error fetching location data',
        error: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
