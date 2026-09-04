"use client";

import { useRouter, usePathname } from "next/navigation";
import type { AnchorHTMLAttributes } from "react";

type ScrollLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

function scrollToId(id: string) {
  const el = document.querySelector(`#${id}`);
  if (!el) return;
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function ScrollLink({ href, onClick, ...props }: ScrollLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [targetPath, hash] = href.split("#");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || !hash) return;

    e.preventDefault();

    if (targetPath === pathname) {
      history.replaceState(null, "", href);
      scrollToId(hash);
    } else {
      router.push(href);
    }
  };

  return <a href={href} onClick={handleClick} {...props} />;
}
