import CommonBanner from "@/src/components/common/CommonBanner";
import BlogGrid from "./components/BlogGrid";
import { getBlogList } from "@/src/service/blogs";

export default async function BlogPage() {
  const { data: blogs } = await getBlogList();
  const activeBlogs = blogs.filter((b) => b.active !== false && b.is_published);

  return (
    <div>
      <CommonBanner title="Blog" />
      <BlogGrid blogs={activeBlogs} />
    </div>
  );
}
