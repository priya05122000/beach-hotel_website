'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSInit() {
    const pathname = usePathname();

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
            mirror: true,
        });
    }, []);

    useEffect(() => {
        // Defer until after React finishes painting the new route
        const id = setTimeout(() => AOS.refreshHard(), 50);
        return () => clearTimeout(id);
    }, [pathname]);

    return null;
}