// components/BlogSection.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  id: number;
  image: string;
  title: string;
  description: string;
  link: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    image: "/images/blog1.jpg",
    title: "AIRPORT PARKING SERVICES PROVIDER: EASY PARKING LTD",
    description:
      "When it comes to air travel, parking is one of the most overlooked yet crucial aspects of a seamless journey. Whether you're a frequent traveler or flying for the first time, the stress of finding",
    link: "/blog/airport-parking-services",
  },
  {
    id: 2,
    image: "/images/blog2.jpg",
    title: "WHAT ARE THE BENEFITS OF GATWICK AIRPORT PARKING?",
    description:
      "Traveling through Gatwick Airport can be a breeze when you've got your parking sorted. With the right parking provider, such as Easy Parking LTD, you can enjoy convenience, security, and peace of mind, making your journey",
    link: "/blog/benefits-gatwick-parking",
  },
  {
    id: 3,
    image: "/images/blog3.jpg",
    title: "WHY CHOOSE EASY PARKING LTD FOR GATWICK AIRPORT PARKING SERVICES?",
    description:
      "Traveling through Gatwick Airport can be a stressful experience, especially when it comes to parking. However, with Easy Parking LTD, travelers are guaranteed a smooth, reliable, and hassle-free parking service tailored to their needs. This comprehensive",
    link: "/blog/why-choose-easy-parking",
  },
];

const BlogSection: React.FC = () => {
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