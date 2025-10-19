"use client"; // admin login needs client for context/hooks

import { TransportAdminProvider } from '@/components/transportadmincontext/admincontext';

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <TransportAdminProvider>
      <div>
        {children}
      </div>
    </TransportAdminProvider>
  );
}
