import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Zoom Autos - Your Trusted Logistics partner",
    template: "%s | Zoom Autos",
  },
  description:
    "Zoom Autos provides professional car transport and logistics services across the UK. We offer fast nationwide delivery, secure vehicle handling, flexible transport options, and first-class customer service.",
  keywords: [
    "car transport",
    "vehicle delivery UK",
    "Zoom Autos",
    "car shipping UK",
    "UK vehicle logistics",
    "fast car delivery",
    "secure car transport",
    "nationwide vehicle transport",
    "reliable car transport services",
    "professional vehicle movers",
    "UK auto logistics",
    "car transport company",
    "vehicle shipping services",
    "door-to-door car transport",
    "low-cost vehicle delivery",
    "trusted car transport UK",
    "automotive logistics",
    "Zoom Autos logistics",
    "safe car shipping",
    "UK vehicle transport solutions",
    "car relocation services",
    "fleet transport services",
  ],
  openGraph: {
    title: "Zoom Autos - Trusted Vehicle Transport & Logistics",
    description:
      "Professional UK car transport and logistics services. Nationwide delivery, secure vehicle handling, and first-class service.",
    url: "https://www.zoomautos.co.uk",
    siteName: "Zoom Autos",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zoom Autos - Car Transport & Logistics",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zoom Autos - Trusted Vehicle Transport & Logistics",
    description:
      "Professional UK car transport and logistics services. Fast nationwide delivery and secure vehicle handling.",
    images: ["/og-image.jpg"],
  },
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
