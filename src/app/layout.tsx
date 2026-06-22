import "./globals.css";
import ClientLayout from "./ClientLayout";
import { marcellus, inter } from "../lib/font";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${marcellus.variable} ${inter.variable}`}
    >
      <body className="antialiased overflow-x-hidden">

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