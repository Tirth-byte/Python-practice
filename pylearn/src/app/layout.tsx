import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "PyLearn — Learn Python, properly.",
  description: "Learn Python, properly. Two paths, one platform. From zero to real engineering, all in the browser.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-paper text-ink font-sans flex flex-col antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
