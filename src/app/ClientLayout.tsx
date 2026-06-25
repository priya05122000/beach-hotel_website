import React from "react";
import Navbar from "../components/layout/Navbar";
import AOSInit from "../components/common/AOSInit";
import LenisProvider from "./components/LenisProvider";
import { getAnnouncementsData } from "../service/announcement";
import Footer from "../components/layout/Footer";

type Props = {
    children: React.ReactNode;
};

export default async function ClientLayout({ children }: Props) {

    const announcementData = await getAnnouncementsData();

    return (
        <LenisProvider>
            <AOSInit />

            <Navbar announcementData={announcementData.data} />
            <main id="main-content">
                {children}
            </main>
            <Footer />
        </LenisProvider>
    );
}
