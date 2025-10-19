"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ClientProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Wait for client-side sessionStorage
    const token = sessionStorage.getItem("authTokenDealer");

    if (!token) {
      // Redirect if not logged in
      router.push("/login");
    } else {
      setIsVerified(true); // Allow access
    }
  }, [router]);

  // Optional loading spinner while checking
  if (!isVerified) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #121212, #1e1e1e)",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Zoom Autos Logo or Loader */}
      <div
        style={{
          border: "4px solid rgba(255, 255, 255, 0.2)",
          borderTop: "4px solid #e80f17",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          animation: "spin 1s linear infinite",
          marginBottom: "20px",
        }}
      />

      <h2 style={{ fontSize: "1.4rem", letterSpacing: "1px" }}>
        Checking authentication...
      </h2>
      <p style={{ marginTop: "10px", color: "rgba(255, 255, 255, 0.7)", fontSize: "0.9rem" }}>
        Please wait while we verify your access to <strong>Zoom Autos Dashboard</strong>.
      </p>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}


  return <>{children}</>;
}
