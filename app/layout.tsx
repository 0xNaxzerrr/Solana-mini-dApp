"use client";
import WalletContextProvider from "@/components/WalletContextProvider";
import "./globals.css";
import * as React from "react";
import { AppBar } from "@/components/AppBar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WalletContextProvider>
            <AppBar />
            {children}
            <Toaster />
          </WalletContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
