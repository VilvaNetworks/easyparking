import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import blogsData from '@/data/blogs.json';

export const metadata: Metadata = {
  title: 'Airport Parking Blog & Travel Tips | Easy Parking Ltd',
  description: 'Stay updated with airport parking insights, professional valeting tips, Gatwick Airport updates, and holiday travel recommendations from Easy Parking Ltd.',
};

export default function BlogIndexPage() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://www.easyparkingltd.com/blog/#blog",
    "url": "https://www.easyparkingltd.com/blog",
    "name": "Blog - Easy Parking Ltd",
    "description": "Read our latest news and tips about airport parking services, Gatwick parking benefits, and more.",
    "publisher": {
      "@type": "Organization",
      "@id": "https://www.easyparkingltd.com/#organization",
      "name": "Easy Parking Ltd",
      "url": "https://www.easyparkingltd.com"
    },
    "blogPost": blogsData.map((post) => ({
      "@type": "BlogPosting",
      "@id": `https://www.easyparkingltd.com/blog/${post.slug}/#blogpost`,
      "url": `https://www.easyparkingltd.com/blog/${post.slug}`,
      "headline": post.title,
      "description": post.excerpt,
      "image": `https://www.easyparkingltd.com${post.image}`,
      "datePublished": post.date,
      "author": {
        "@type": "Organization",
        "name": post.author
      }
    }))
  };

  return (
    <div className="w-full bg-[#fcfbfa] text-[#2c3e50] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      {/* ================= HEADER BANNER ================= */}
      <section className="relative w-full h-[240px] md:h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/blog/blog.jpg"
            alt="Our Blog Banner"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <div className="relative z-10 text-center px-4 mt-6">
          <h1 className="text-white text-[32px] sm:text-[40px] md:text-[50px] font-extrabold tracking-[4px] uppercase font-sans">
            Our Blog
          </h1>
        </div>
      </section>

      {/* ================= POSTS GRID SECTION ================= */}
      <section className="w-full py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogsData.map((post) => (
              <article 
                key={post.id}
                className="bg-white border border-[#eaeaea] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
              >
                {/* Thumbnail Link */}
                <Link 
                  href={`/blog/${post.slug}`}
                  className="relative block w-full aspect-[300/200] overflow-hidden"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                {/* Content Area */}
                <div className="p-6 flex flex-col grow">
                  {/* Post Title */}
                  <h2 className="text-[#1a1a1a] hover:text-[#e7701e] transition-colors duration-300 text-[18px] sm:text-[20px] font-extrabold mb-4 leading-snug font-sans line-clamp-2 uppercase">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-[#555555] text-[14px] leading-[1.65] mb-6 line-clamp-3 grow">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-[#1a1a1a] hover:text-[#e7701e] transition-colors duration-300 font-extrabold text-[13px] tracking-wider uppercase"
                    >
                      Read More &raquo;
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
