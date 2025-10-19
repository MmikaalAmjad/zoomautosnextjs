import { DealerProvider } from "@/components/clientcontext/clientcontext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DealerProvider>
          {children}
        </DealerProvider>
      </body>
    </html>
  );
}
