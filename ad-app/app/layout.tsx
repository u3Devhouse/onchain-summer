import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { headers } from "next/headers";

import { cookieToInitialState } from "wagmi";

import { config } from "@/utils/web3/config";
import Web3ModalProvider from "./ClientProviders";

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
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body className={cn(inter.className, anton.variable)}>
        <Web3ModalProvider initialState={initialState}>
          {children}
        </Web3ModalProvider>
      </body>
    </html>
  );
}
