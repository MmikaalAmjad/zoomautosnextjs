import React from 'react';
import Carousel from '@/components/homepage/carousel/carousel';
import SelfEmployedDriver from '@/components/becomedriver/role';

export const metadata = {
  title: 'Join Zoom Autos - Become a Driver | UK Vehicle Recovery & Transport',
   metadataBase: new URL("https://zoomautos.co.uk"), 
  description: 'Register as a professional driver with Zoom Autos in the UK. Enjoy flexible hours, competitive pay, nationwide vehicle recovery, and car transport opportunities with a trusted logistics company.',
  keywords: [
    'Zoom Autos',
    'driver registration',
    'vehicle recovery UK',
    'car transport jobs',
    'professional drivers UK',
    'UK driving jobs',
    'work for Zoom Autos',
    'UK vehicle transport careers',
    'flexible driver jobs',
    'car delivery driver UK',
    'UK automotive transport jobs',
    'vehicle relocation UK',
    'transport driver vacancies',
    'logistics driver UK',
    'UK professional drivers',
    'reliable driving jobs UK',
  ],
  openGraph: {
    title: 'Join Zoom Autos - Become a Driver',
    description: 'Become a professional driver with Zoom Autos. Flexible hours, competitive pay, and nationwide vehicle recovery and transport work across the UK.',
    url: 'https://zoomautos.co.uk/becomeadriver',
    siteName: 'Zoom Autos',
    images: [
      {
        url: '/Driver1.jpg',
        width: 800,
        height: 600,
        alt: 'Join Zoom Autos as a professional driver',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join Zoom Autos - Become a Driver',
    description: 'Register as a driver with Zoom Autos. Flexible hours, competitive pay, and UK-wide vehicle recovery and transport opportunities.',
    images: ['/Driver1.jpg'],
  },
};


const imagesW = [
  { image: '/Driver1.jpg' },
  { image: '/Driver 2.jpg' },
];

export default async function UserInformationPage({ searchParams }: any) {
  // Check for success query param after redirect
  

  return (
    <>
      <Carousel imagesWithText={imagesW} />
      <div className='overlay-text'>
        <h1>Welcome To Zoom Autos</h1>
        <h2 style={{ color: 'Red' }}>Work For US</h2>
      </div>
      <div style={{ marginTop: '-10px' }}>
        <SelfEmployedDriver />
      </div>

      

      <form
        action="/api/driverregistration"
        method="POST"
        
      >
        <h1>Register Yourself As a Driver</h1>
        <div className='move-container'>
        <div className="mve-form">
          <h2>Driver Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input type="text" id="firstName" name="firstName" required />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" id="lastName" name="lastName" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number:</label>
              <input type="tel" id="mobileNumber" name="mobileNumber" required />
            </div>

            <div className="form-group">
              <label htmlFor="emailAddress">Email Address:</label>
              <input type="email" id="emailAddress" name="emailAddress" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="townCity">Town or City:</label>
              <input type="text" id="townCity" name="townCity" required />
            </div>

            <div className="form-group">
              <label htmlFor="insurance">Insurance Number</label>
              <input type="text" id="insurance" name="insurance" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="drivingLicenceNumber">Driving Licence Number:</label>
              <input type="text" id="drivingLicenceNumber" name="drivingLicenceNumber" required />
            </div>

            <div className="form-group">
              <label htmlFor="drivingLicenceShareCode">Driving Licence Share Code:</label>
              <input type="text" id="drivingLicenceShareCode" name="drivingLicenceShareCode" required />
            </div>
          </div>

          <small>
            To access your driving licence share code{' '}
            <a href="https://www.gov.uk/view-driving-licence" target="_blank" rel="noopener noreferrer">
              click here
            </a>
          </small>

          <div className="form-group">
            <label htmlFor="fullLicenceCheck">Full Licence Check:</label>
            <input type="checkbox" id="fullLicenceCheck" name="fullLicenceCheck" />
            <span>
              I hereby give my permission for Zoom Autos to conduct a full check of my driving licence as and when required.
            </span>
          </div>

          {/* Permission to share and overnight availability */}
          <div className="form-section">
            <h3>Permission to Share Mobile Number:</h3>
            <label>
              <input type="radio" name="permissionToShare" value="Yes" required /> Yes
            </label>
            <label>
              <input type="radio" name="permissionToShare" value="No" required /> No
            </label>

            <h3>Available to Stay Overnight?</h3>
            <label>
              <input type="radio" name="availableOvernight" value="Yes" required /> Yes
            </label>
            <label>
              <input type="radio" name="availableOvernight" value="No" required /> No
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="offRoadParking">Do you have space for offRoadParking?</label>
            <input type="checkbox" id="offRoadParking" name="offRoadParking" />
          </div>

          <button type="submit" className="contact-button">
            Submit
          </button>
        </div>
        </div>
      </form>
    </>
  );
}
