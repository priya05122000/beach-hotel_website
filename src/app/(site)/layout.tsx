import React from "react";
import Navbar from "../../components/layout/Navbar";
import LenisProvider from "../../components/LenisProvider";
import Footer from "../../components/layout/Footer";
import HotelJsonLd from "../../components/common/JsonLd";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LenisProvider>
        <HotelJsonLd />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </LenisProvider>
    </>
  );
}
