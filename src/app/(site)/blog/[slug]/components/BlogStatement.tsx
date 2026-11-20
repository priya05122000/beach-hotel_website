import type { Blog } from "@/src/types";
import Section from "@/src/components/common/Section";

interface Props {
  blog: Blog;
}

// FAQ block after the article. The blog title (<h1>) is in BlogIntro.
export default function BlogStatement({ blog }: Props) {
  if (!blog.description_3) return null;

  // Per-post heading so it isn't the same <h2> on every blog post
  // ("H2: Duplicate" in SEO audits). tag_1 is tidied: CMS values can
  // contain double/trailing spaces.
  const topic = blog.tag_1?.replace(/\s+/g, " ").trim();
  const heading = topic ? `FAQs About ${topic}` : "Frequently Asked Questions";

  return (
    <Section className="py-16 md:py-20 bg-ivory">
      <div className="max-w-3xl">
        <p className="type-h2 font-semibold text-primary-dark mb-4">
          {heading}
        </p>
        <div
          className="blog-content text-charcoal leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.description_3 }}
        />
      </div>
    </Section>
  );
}
