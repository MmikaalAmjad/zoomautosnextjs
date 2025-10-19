import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Type for form data
interface DriverFormData {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  emailAddress: string;
  townCity: string;
  niNumber?: string;
  insurance: string;
  drivingLicenceNumber: string;
  drivingLicenceShareCode: string;
  fullLicenceCheck?: boolean;
  permissionToShare: string;
  availableOvernight: string;
  offRoadParking?: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const data: DriverFormData = await req.json();

    // Optional: Basic server-side validation
    if (!data.firstName || !data.lastName || !data.mobileNumber || !data.emailAddress) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send form data to your backend endpoint
    const response = await axios.post('https://zoomautos.co.uk/car', {
      formType: 'DriverForm',
      ...data,
    });

    return NextResponse.json(
      { message: 'Form submitted successfully', data: response.data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error submitting form:', error.response?.data || error.message);
    return NextResponse.json(
      { message: 'Error submitting form', error: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
