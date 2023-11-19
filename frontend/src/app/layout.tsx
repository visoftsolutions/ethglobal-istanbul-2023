import type { Metadata } from "next";
import "./globals.css";

import { Web3Modal } from "@/context/Web3Modal";

export const metadata: Metadata = {
  title: "Degen Drink",
  description: "Inspired by festive beverages and gourmet flavors [kebab].",

  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

import "./globals.css";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      <body>
        <Web3Modal>{children}</Web3Modal>
      </body>
    </html>
  );
}
