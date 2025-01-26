import React from "react";
import Header from "./header";
import Footer from "./footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex justify-between flex-col font-sans">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 mt-20 mb-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
