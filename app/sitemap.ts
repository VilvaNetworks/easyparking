import { MetadataRoute } from 'next';
import posts from '@/data/blogs.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.easyparkingltd.com';

  // Static site paths
  const staticPaths = [
    '',
    '/about-us',
    '/contact-us',
    '/how-it-works',
    '/services',
    '/blog',
    '/car-park-booking-system',
    '/sitemap',
    '/standard-operating-procedure',
    '/terms-and-conditions',
    '/privacy-policy',
  ];

  const staticEntries = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1.0 : 0.8,
  }));

  // Dynamic blog entries from data/blogs.json
  const blogEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date), // Parse date if possible, otherwise falls back to current Date
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
