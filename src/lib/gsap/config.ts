/** Central animation constants — import from here instead of hardcoding values. */
export const ANIM = {
  duration: {
    fast: 0.4,
    base: 0.8,
    slow: 1.2,
    xslow: 1.6,
  },
  stagger: {
    tight: 0.06,
    base: 0.12,
    loose: 0.2,
  },
  ease: {
    default: "power3.out",
    inOut: "power2.inOut",
    bounce: "back.out(1.4)",
    smooth: "expo.out",
  },
  parallax: {
    slow: 0.15,
    base: 0.22,
    fast: 0.35,
  },
  scale: {
    zoom: 0.32,
    zoomMid: 0.65,
  },
  start: {
    default: "top 75%",
    early: "top 85%",
    late: "top 60%",
    center: "center center",
  },
} as const;
