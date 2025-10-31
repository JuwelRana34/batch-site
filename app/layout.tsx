import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import { Providers } from "@/context/TanstakProvider";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const Nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose weights you need
  variable: "--font-Nunito", // CSS variable name
});

export const metadata: Metadata = {
  title: "Jagannath University 18th Batch",
  description:
    "A website for the Jagannath University 18th batch students. Stay connected with batchmates, get updates, and celebrate events together.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  keywords: [
    "Jagannath University",
    "JnU 18th batch",
    "student community",
    "batch updates",
    "events",
    "JnU students",
    "18th batch JnU",
  ],
  authors: [
    { name: "JnU 18th Batch Team", url: "https://jnuihc.netlify.app/" },
  ],
  openGraph: {
    title: "Jagannath University 18th Batch",
    description:
      "A website for Jagannath University 18th batch students to stay connected and updated with batch activities.",
    url: "https://jnuihc.netlify.app/",
    siteName: "JnU 18th Batch",
    type: "website",
    images: [
      {
        url: "/football.jpg",
        width: 1200,
        height: 630,
        alt: "Jagannath University 18th Batch",
      },
    ],
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="3MgW4L0fuwgkr-4gVk1_Odm9_aH4KnOesWwQtl6mVKs"
        />
      </Head>

      <body className={`${Nunito.variable} antialiased`}>
        <Providers>
          <AuthProvider>{children}</AuthProvider>
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
