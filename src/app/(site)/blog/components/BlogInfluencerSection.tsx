"use client";

import { useState } from "react";
import type { Blog, Reel } from "@/src/types";
import Section from "@/src/components/common/Section";
import BlogCardsGrid from "./BlogGrid";
import InfluencerCardsGrid from "./InfluencerCardsGrid";

interface Props {
  blogs: Blog[];
  reels: Reel[];
}

type Tab = "influencer" | "blog";

export default function BlogInfluencerSection({ blogs, reels }: Props) {
  const [tab, setTab] = useState<Tab>("influencer");

  return (
    <Section className="py-16 lg:py-20">
      <div className="grid sm:grid-cols-2 xl:grid-cols-[1fr_1.5fr] border-b border-silver sm:border-b-0 pb-16 sm:pt-16 lg:py-20">
        {/* Exactly one real heading regardless of which tab is active — the
            tab buttons below are controls, not headings, so this keeps the
            h1 -> h2 -> h3 (per-card) outline intact either way. */}
        <h2 className="sr-only">Journal &amp; Influencer Spotlight</h2>

        <div
          role="tablist"
          aria-label="Journal and influencer content"
          className="flex sm:flex-col items-start gap-6"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === "influencer"}
            onClick={() => setTab("influencer")}
            className={`type-h6 leading-relaxed tracking-[60%] lg:tracking-[83%] uppercase cursor-pointer transition-colors pb-1 border-b-2 ${tab === "influencer"
                ? "text-primary-dark font-semibold border-primary-dark"
                : "text-gray border-transparent hover:text-primary-dark/70"
              }`}
          >
            Influencers
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "blog"}
            onClick={() => setTab("blog")}
            className={`type-h6 leading-relaxed tracking-[60%] lg:tracking-[83%] uppercase cursor-pointer transition-colors pb-1 border-b-2 ${tab === "blog"
                ? "text-primary-dark font-semibold border-primary-dark"
                : "text-gray border-transparent hover:text-primary-dark/70"
              }`}
          >
            Blogs
          </button>
        </div>

        {/* Desktop — uppercase, wide-tracking heading style */}
        <div className="hidden lg:block uppercase type-h6 text-primary-dark lg:max-w-md xl:max-w-xl mt-10 sm:mt-0 tracking-[0.2rem] leading-8">
          There is a story in every corner of this remarkable land, and our journal is where we tell them. Wander through insider guides to Kanyakumari&apos;s coast and countryside, seasonal highlights, and tales from within the walls of The Beach Hotel. We hope these pages inspire you to look further, savour deeper, and dream of the sea.
        </div>

        {/* Mobile/tablet — plain body-text style, easier to read at small sizes */}
        <p className="lg:hidden text-xl text-charcoal type-body-xl mt-10 sm:mt-0 leading-relaxed">
          There is a story in every corner of this remarkable land, and our journal is where we tell them. Wander through insider guides to Kanyakumari&apos;s coast and countryside, seasonal highlights, and tales from within the walls of The Beach Hotel. We hope these pages inspire you to look further, savour deeper, and dream of the sea.
        </p>
      </div>

      {/* Both grids are always rendered — only visibility (via the native
          `hidden` attribute) toggles with the tab — so every blog post's
          <Link> exists in the server-rendered HTML regardless of which tab
          is active by default. Previously this was a JS-only conditional
          mount defaulting to "influencer", which meant a crawler that
          doesn't execute JS (Semrush's Site Audit runs with JS rendering
          disabled) never saw a single link to any blog post, leaving every
          post "orphaned" — discoverable only via sitemap.xml, not via any
          crawlable on-page link. */}
      <div role="tabpanel" hidden={tab !== "influencer"}>
        <InfluencerCardsGrid reels={reels} />
      </div>
      <div role="tabpanel" hidden={tab !== "blog"}>
        <BlogCardsGrid blogs={blogs} />
      </div>
    </Section>
  );
}
