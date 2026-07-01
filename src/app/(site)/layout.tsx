import React from "react";
import Navbar from "../../components/layout/Navbar";
import LenisProvider from "../../components/LenisProvider";
import { getAnnouncementsData } from "../../service/announcement";
import Footer from "../../components/layout/Footer";
import HotelJsonLd from "../../components/common/JsonLd";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const announcementData = await getAnnouncementsData();

  return (
    <LenisProvider>
      <HotelJsonLd />
      <Navbar announcementData={announcementData.data} />
      <main id="main-content">{children}</main>
      <Footer />
    </LenisProvider>
  );
}
