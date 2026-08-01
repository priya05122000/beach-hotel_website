import Image from "next/image";
import type { Blog } from "@/src/types";

interface Props {
  blog: Blog;
}

export default function BlogHero({ blog }: Props) {

  return (
    <section className="relative w-full h-[50vh] bg-black overflow-hidden flex flex-col justify-end">

      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${blog.image_url}`}
          alt={blog.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Bottom fade to black so text reads cleanly */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" /> */}
      </div>
    </section>
  );
}
