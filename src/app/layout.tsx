import React from "react";
import "./globals.css";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { CounterContextProvider } from "./context/equiposProvider";
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
        <CounterContextProvider>{children}</CounterContextProvider>

        <Toaster />
      </body>
    </html>
  );
}
