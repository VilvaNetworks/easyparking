import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import blogs from "@/data/blogs.json";
import BlogCommentForm from "@/components/BlogCommentForm";
import BlogRelatedSwiper from "@/components/BlogRelatedSwiper";

interface ContentBlock {
  type: string;
  text?: string;
  items?: string[];
}

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  time: string;
  comments: number;
  image: string;
  excerpt: string;
  author: string;
  prevSlug: string | null;
  prevTitle: string | null;
  nextSlug: string | null;
  nextTitle: string | null;
  content: ContentBlock[];
}

export async function generateStaticParams() {
  return (blogs as BlogPost[]).map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (blogs as BlogPost[]).find((b) => b.slug === slug);
  if (!post) return {};
  return { title: `${post.title} - Easy Parking Ltd` };
}

function renderContent(block: ContentBlock, idx: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={idx} className="text-[#3a3a3a] text-[15px] leading-[1.85] mb-5">
          {block.text}
        </p>
      );
    case "heading2":
      return (
        <h2 key={idx} className="text-[#1a1a1a] text-[22px] md:text-[24px] font-bold mt-9 mb-4 leading-snug">
          {block.text}
        </h2>
      );
    case "heading3":
      return (
        <h3 key={idx} className="text-[#1a1a1a] text-[17px] font-bold mt-6 mb-3 leading-snug">
          {block.text}
        </h3>
      );
    case "list":
      return (
        <ul key={idx} className="list-disc list-inside mb-5 space-y-1.5 pl-1">
          {block.items?.map((item, i) => (
            <li key={i} className="text-[#3a3a3a] text-[15px] leading-[1.75]">
              {item}
            </li>
          ))}
        </ul>
      );
    case "orderedList":
      return (
        <ol key={idx} className="list-decimal list-inside mb-5 space-y-1.5 pl-1">
          {block.items?.map((item, i) => (
            <li key={i} className="text-[#3a3a3a] text-[15px] leading-[1.75]">
              {item}
            </li>
          ))}
        </ol>
      );
    default:
      return null;
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (blogs as BlogPost[]).find((b) => b.slug === slug);
  if (!post) notFound();

  const relatedPosts = (blogs as BlogPost[])
    .filter((b) => b.slug !== slug)
    .map((b) => ({ slug: b.slug, title: b.title, date: b.date, image: b.image, excerpt: b.excerpt }));

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-10 md:py-14">

        {/* Two-column layout: content left, sidebar right (desktop only) */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

          {/* ── LEFT: Main content (full on mobile, 8/12 on desktop) ── */}
          <div className="w-full lg:w-8/12">

            {/* Title */}
            <h1 className="text-[#1a1a1a] text-[26px] md:text-[32px] font-extrabold leading-tight mb-5 tracking-tight">
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px] text-[#888] mb-7 border-b border-[#e8e8e8] pb-5">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {post.time}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                {post.comments} Comments
              </span>
            </div>

            {/* Hero image */}
            <div className="relative w-full h-60 md:h-100 mb-8 overflow-hidden">
              <Image src={post.image} alt={post.title} fill className="object-cover" priority />
            </div>

            {/* Article body */}
            <div>
              {post.content.map((block, idx) => renderContent(block, idx))}
            </div>

            {/* Author card */}
            <div className="mt-12 bg-[#f5f5f5] border border-[#e8e8e8] p-6 flex items-center gap-5">
              <div className="w-16 h-16 shrink-0 rounded-full bg-[#ff8c00] flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div>
                <p className="text-[13px] text-[#888] mb-0.5 uppercase tracking-wide">Picture of</p>
                <p className="text-[#1a1a1a] font-bold text-[15px]">{post.author}</p>
                <Link href="/blog" className="text-[13px] text-[#ff8c00] hover:underline mt-0.5 inline-block">
                  All Posts »
                </Link>
              </div>
            </div>

            {/* Prev / Next */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {post.prevSlug ? (
                <Link href={`/blog/${post.prevSlug}`} className="flex-1 border border-[#e8e8e8] p-5 hover:border-[#ff8c00] transition-colors group">
                  <p className="text-[12px] text-[#888] uppercase tracking-wide mb-1">← Prev</p>
                  <p className="text-[14px] font-semibold text-[#1a1a1a] group-hover:text-[#ff8c00] leading-snug">{post.prevTitle}</p>
                </Link>
              ) : <div className="flex-1" />}
              {post.nextSlug ? (
                <Link href={`/blog/${post.nextSlug}`} className="flex-1 border border-[#e8e8e8] p-5 hover:border-[#ff8c00] transition-colors text-right group">
                  <p className="text-[12px] text-[#888] uppercase tracking-wide mb-1">Next →</p>
                  <p className="text-[14px] font-semibold text-[#1a1a1a] group-hover:text-[#ff8c00] leading-snug">{post.nextTitle}</p>
                </Link>
              ) : <div className="flex-1" />}
            </div>

            {/* Mobile related posts — Swiper (hidden on desktop) */}
            {relatedPosts.length > 0 && (
              <div className="mt-12 lg:hidden">
                <h3 className="text-[#1a1a1a] text-[18px] font-bold mb-5 pb-3 border-b border-[#e8e8e8]">
                  Related Posts
                </h3>
                <BlogRelatedSwiper posts={relatedPosts} />
              </div>
            )}

            {/* Comment form */}
            <BlogCommentForm />
          </div>

          {/* ── RIGHT: Sidebar related posts (desktop only, 4/12) ── */}
          {relatedPosts.length > 0 && (
            <aside className="hidden lg:block w-4/12 shrink-0">
              <div className="sticky top-8">
                <h3 className="text-[#1a1a1a] text-[18px] font-bold mb-5 pb-3 border-b-2 border-[#ff8c00]">
                  Related Posts
                </h3>
                <div className="flex flex-col gap-7">
                  {relatedPosts.map((rp) => (
                    <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group flex flex-col gap-3">
                      <div className="relative w-full h-45 overflow-hidden">
                        <Image
                          src={rp.image}
                          alt={rp.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <p className="text-[12px] text-[#888]">{rp.date}</p>
                      <h4 className="text-[#1a1a1a] text-[14px] font-bold leading-snug group-hover:text-[#ff8c00] transition-colors line-clamp-3">
                        {rp.title}
                      </h4>
                      <p className="text-[#555] text-[13px] leading-[1.65] line-clamp-3">
                        {rp.excerpt}
                      </p>
                      <span className="text-[#ff8c00] text-[13px] font-semibold">Read More »</span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          )}

        </div>
      </div>
    </div>
  );
}
