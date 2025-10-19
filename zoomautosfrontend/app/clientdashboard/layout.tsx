"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/navbar/clientnavbar";
import ClientProtectedRoute from "@/components/clientprotectedroute";
import { DealerProvider } from "@/components/clientcontext/clientcontext";

interface ClientDashboardLayoutProps {
  children: ReactNode;
}

export default function ClientDashboardLayout({ children }: ClientDashboardLayoutProps) {
  return (
    <DealerProvider>
      {/* Protect the entire dashboard */}
      <ClientProtectedRoute>
        {/* Sidebar visible on all dashboard pages */}
        <Sidebar />

        {/* Main dashboard content */}
        <main>
          {children}
        </main>
      </ClientProtectedRoute>
    </DealerProvider>
  );
}
