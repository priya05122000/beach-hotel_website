import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-jakarta",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body className={`${plusJakarta.variable} ${inter.variable} font-inter antialiased`}>

        <ClientLayout>
          {children}
        </ClientLayout>
        {/*
        <Toaster
          position="top-right"
          richColors
        /> */}

      </body>
    </html>
  );
}