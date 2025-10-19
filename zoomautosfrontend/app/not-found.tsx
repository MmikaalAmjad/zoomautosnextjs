"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div
      style={{
        backgroundColor: "#001F3F", // dark blue background
        color: "#ffffff",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px",
      }}
    >
      {/* Logo with subtle fade-in from top */}
      <motion.img
        src="/Logo4.png" // 👉 replace with your actual logo path (e.g. /images/logo.png)
        alt="Zoom Autos Logo"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          width: "400px",
          marginBottom: "20px",
        }}
      />

      {/* 404 Text animation */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          fontSize: "90px",
          fontWeight: "700",
          marginBottom: "10px",
          letterSpacing: "2px",
        }}
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{
          fontSize: "28px",
          fontWeight: "500",
          marginBottom: "15px",
        }}
      >
        Oops! Page Not Found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        style={{
          fontSize: "18px",
          maxWidth: "500px",
          marginBottom: "40px",
          lineHeight: "1.6",
        }}
      >
        The page you’re looking for doesn’t exist or may have been moved.
      </motion.p>

      {/* Go Home button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <Link
          href="/"
          style={{
            backgroundColor: "#e80f17",
            color: "#fff",
            padding: "12px 30px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
            transition: "background 0.3s",
          }}
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
}
