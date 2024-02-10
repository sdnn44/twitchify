import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContextProvider from "./providers/ContextProvider";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitchify",
  description: "Latest and greatest clips on Twitch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <main className="max-w-7xl mx-auto bg-[#0F1117]">
            <NextTopLoader
              height={2}
              color="white"
              easing='cubic-bezier(0.53, 0.21, 0, 1)'
            />
            <Header />
            {children}
            <Footer />
          </main>
        </ContextProvider>
      </body>
    </html>
  );
}
