import "./globals.css";
import {
  arizonaSansBold,
  arizonaFlareRegular,
  arizonaSansRegular,
} from "../lib/font";
import { Toaster } from "react-hot-toast";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={` ${arizonaSansBold.variable} ${arizonaFlareRegular.variable} ${arizonaSansRegular.variable}`}
    >
      <body className="antialiased overflow-x-hidden" suppressHydrationWarning>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
