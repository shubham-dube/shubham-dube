import type { MetadataRoute } from 'next';
import { caseStudies } from '@/content';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/work`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/resume`, changeFrequency: 'monthly', priority: 0.8 },
    ...caseStudies.map((p) => ({ url: `${site.url}/work/${p.slug}`, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}
