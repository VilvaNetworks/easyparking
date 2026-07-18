// components/BlogSection.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import blogs from "@/data/blogs.json";

const BlogSection: React.FC = () => {
  const blogPosts = blogs.map((post) => ({
    id: post.id,
    image: post.image,
    title: post.title,
    description: post.excerpt,
    link: `/blog/${post.slug}`,
  }));

  return (
    <section className="w-full bg-[#f5f5f5] py-16 md:py-20 lg:py-24 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* ===== Section Headers ===== */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[#ff8c00] text-[15px] font-bold uppercase tracking-[2.5px] mb-5">
            OUR&nbsp;&nbsp;BLOG
          </p>
          <h2 className="text-[#1a1a1a] text-[32px] md:text-[40px] lg:text-[44px] font-extrabold leading-[1.2] tracking-tight">
            Park Smart at Gatwick: Easy Parking LTD
            <br />
            Has You Covered
          </h2>
        </div>

        {/* ===== Blog Cards Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-transparent flex flex-col group"
            >
              {/* Blog Image */}
              <div className="relative w-full h-[280px] md:h-[320px] overflow-hidden mb-6">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Title */}
              <h3 className="text-[#1a1a1a] text-[18px] md:text-[19px] font-extrabold mb-4 leading-[1.4] uppercase">
                {post.title}
              </h3>

              {/* Description */}
              <p className="text-[#4a4a4a] text-[15px] leading-[1.7] mb-6 flex-grow">
                {post.description}
              </p>

              {/* Read More Link */}
              <Link
                href={post.link}
                className="inline-flex items-center gap-1 text-[#1a1a1a] text-[15px] font-semibold hover:text-[#ff8c00] transition-colors duration-300 mt-auto"
              >
                <span>Read More</span>
                <span className="text-[18px] leading-none">»</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;