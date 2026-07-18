"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

interface RelatedPost {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
}

export default function BlogRelatedSwiper({ posts }: { posts: RelatedPost[] }) {
  return (
    <Swiper
      modules={[Autoplay]}
      loop={posts.length > 1}
      autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
      speed={700}
      grabCursor={true}
      slidesPerView={1}
      spaceBetween={16}
    >
      {posts.map((post) => (
        <SwiperSlide key={post.slug}>
          <Link href={`/blog/${post.slug}`} className="block group">
            <div className="relative w-full h-[200px] overflow-hidden mb-3">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="text-[12px] text-[#888] mb-1">{post.date}</p>
            <h4 className="text-[#1a1a1a] text-[15px] font-bold leading-snug group-hover:text-[#ff8c00] transition-colors line-clamp-3">
              {post.title}
            </h4>
            <p className="text-[#555] text-[13px] leading-[1.65] mt-2 line-clamp-3">
              {post.excerpt}
            </p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
