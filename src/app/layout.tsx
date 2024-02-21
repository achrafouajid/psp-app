import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/Globals.css";
import Toaster from "@/components/toast";
import { ThemeProvider } from "@/Contexts/ThemeContext";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rafiki",
  description: "Rafiki fi Sihati",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Rafiki Fi Ilaji</title>
        <link rel="icon" href="/rafikifiilaji.png" />
      </Head>
      <ThemeProvider>
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
