import "./globals.css";
import ClientLayout from "./ClientLayout";
import { DM_Sans, Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// import { Toaster } from "sonner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`
          ${dmSans.variable}
          ${dmSans.className}
          antialiased
        `}
      >
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