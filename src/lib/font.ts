import { Marcellus, Inter } from "next/font/google";

export const marcellus = Marcellus({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-marcellus",
    display: "swap",
});

export const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});
