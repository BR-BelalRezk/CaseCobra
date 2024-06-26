import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import ReactQuery from "@/components/providers/ReactQuery";
import { constructMetaData } from "@/lib/utils";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = constructMetaData();

export default function RootLayout({ children }: CHILDREN) {
  return (
    <html lang="en" style={{ scrollbarWidth: "none" }}>
      <body className={`${recursive.className} overflow-x-hidden`}>
        <Navbar />
        <main className="grainy-light flex flex-col min-h-[calc(100vh-3.5rem-1px)]">
          <div className="flex-1 flex flex-col h-full">
            <ReactQuery>{children}</ReactQuery>
          </div>
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
