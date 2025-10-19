import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Zoom Autos - Your Trusted logistics partner",
    template: "%s | Zoom Autos", 
  },
  description:
    "Find quality used cars at competitive prices. Zoom Autos offers nationwide delivery, part exchange, warranties, and finance options.",
  keywords: [
    "used cars",
    "Zoom Autos",
    "car dealership",
    "UK used cars",
    "nationwide delivery",
    "low mileage cars",
  ],
  openGraph: {
    title: "Zoom Autos | Quality Used Cars",
    description:
      "Find quality used cars at competitive prices with Zoom Autos. Family-owned and trusted dealership.",
    url: "https://www.zoomautos.co.uk", // your real domain here
    siteName: "Zoom Autos",
    images: [
      {
        url: "https://your-cloudinary-image-url.jpg",
        width: 1200,
        height: 630,
        alt: "Zoom Autos - Quality Used Cars",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zoom Autos | Quality Used Cars",
    description:
      "Find quality used cars at competitive prices with Zoom Autos.",
    images: ["https://your-cloudinary-image-url.jpg"],
  },
  metadataBase: new URL("https://www.zoomautos.co.uk"),
};



const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap", // prevents layout shift
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        
        {children}</body>
    </html>
  );
}
