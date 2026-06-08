import "./globals.css";
import ClientLayout from "./ClientLayout";
import { arizonaFlare, majesty } from "../lib/font";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${arizonaFlare.variable} ${majesty.variable}`}
    >
      <body className="antialiased">

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