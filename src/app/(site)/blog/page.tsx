import CommonBanner from "@/src/components/common/CommonBanner";
import BlogGrid from "./components/BlogGrid";
import { BLOG_DATA } from "@/src/data/blogs";

export default function BlogPage() {
  const blogs = BLOG_DATA.filter((b) => b.is_published && b.active);

  return (
    <div>
      <CommonBanner title="Blog" />
      <BlogGrid blogs={blogs} />
    </div>
  );
}
