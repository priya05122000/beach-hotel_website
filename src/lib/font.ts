import { Marcellus, Inter } from "next/font/google";
import localFont from "next/font/local";


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


export const arizonaSansBold = localFont({
    src: "../fonts/ABCArizona-SansBold.otf",
    variable: "--font-arizona-sans-bold",
    display: "swap",
});

export const arizonaFlareRegular = localFont({
    src: "../fonts/ABCArizona-FlareRegular.otf",
    variable: "--font-arizona-flare-regular",
    display: "swap",
});

export const arizonaSansRegular = localFont({
    src: "../fonts/ABCArizona-SansRegular.otf",
    variable: "--font-arizona-sans-regular",
    display: "swap",
});