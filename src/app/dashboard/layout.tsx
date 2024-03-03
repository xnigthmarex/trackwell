import type { Metadata } from "next";
import { Victor_Mono } from "next/font/google";
import "@/app/globals.css";

const vc = Victor_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
      <body className={vc.className}>{children}</body>

      </>
  );
}