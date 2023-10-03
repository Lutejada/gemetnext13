import React from "react";
import "./globals.css";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
export const metadata = {
  title: "Gemet",
  description: "Gestion Metrologica",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen">
        {children}

        <Toaster />
      </body>
    </html>
  );
}
