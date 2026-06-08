import localFont from "next/font/local";

export const arizonaFlare = localFont({
    src: "../fonts/ABCArizonaFlareVariable-Trial.ttf",
    variable: "--font-arizona",
    display: "swap",
});

export const majesty = localFont({
    src: [
        {
            path: "../fonts/majesty-light.otf",
            weight: "300",
            style: "normal",
        },
        {
            path: "../fonts/majesty-regular.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../fonts/majesty-bold.otf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-majesty",
    display: "swap",
});