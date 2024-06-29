import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

export const metadata: Metadata = {
  title: "Onchain Summer - Ad Library",
  description: "Onchain Summer - Ad Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, anton.variable)}>{children}</body>
    </html>
  );
}
