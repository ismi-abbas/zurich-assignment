import React from "react";
import Header from "./header";
import Footer from "./footer";
import { classMerge } from "@/utils/cn";

export default function MainLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-screen flex justify-between items-center flex-col font-sans">
      <Header />
      <main
        className={classMerge(
          "flex-1 max-w-7xl mx-auto px-4 sm:px-6 mt-20 mb-20 w-full",
          className
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
