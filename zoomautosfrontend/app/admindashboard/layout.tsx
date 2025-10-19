"use client"; // Client component for hooks and context

import { ReactNode } from "react";
import SidebarAdmin from "@/components/navbar/adminnavbar";
import { TransportAdminProvider } from "@/components/transportadmincontext/admincontext";
import AdminProtectedRoute from "../adminprotectedroute";
interface AdminDashboardLayoutProps {
  children: ReactNode;
}

export default function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  return (
    <TransportAdminProvider>
        {/* Sidebar */}
        <AdminProtectedRoute>
        <SidebarAdmin />

        {/* Main Content */}
        <main >
          {children}
        </main>
        </AdminProtectedRoute>
    </TransportAdminProvider>
  );
}
