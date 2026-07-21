import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/PageLoader";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "FitFlex Gym - Elevate Your Workout",
  description: "Transform your body and mind with our certified trainers and world-class facilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rubik.variable} antialiased`}>
      <body className="min-h-full flex flex-col">
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
