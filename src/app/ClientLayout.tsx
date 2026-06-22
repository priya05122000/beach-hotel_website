import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AOSInit from "../components/common/AOSInit";
import { getAnnouncementsData } from "../service/announcement";

type Props = {
    children: React.ReactNode;
};

export default async function ClientLayout({ children }: Props) {

    const announcementData = await getAnnouncementsData();

    return (
        <>
            <AOSInit />

            <Navbar announcementData={announcementData.data} />
            <main id="main-content">
                {children}
            </main>
            <Footer />
        </>
    );
}
