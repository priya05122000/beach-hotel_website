// ...existing code...
'use client';
import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AOSInit from "../components/common/AOSInit";

type Props = {
    children: React.ReactNode;
};

export default function ClientLayout({ children }: Props) {

    return (
        <>
            <AOSInit />

            <Navbar />
            <main id="main-content">
                {children}
            </main>
            <Footer />
        </>
    );
}
