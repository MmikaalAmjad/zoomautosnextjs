"use client";
import { DealerProvider } from "@/components/clientcontext/clientcontext";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <DealerProvider>
      {children}
    </DealerProvider>
  );
}
