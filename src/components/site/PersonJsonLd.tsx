import { education, experience, profile } from '@/content';
import { site } from '@/lib/site';

/** schema.org Person, so search engines connect the name, roles and profiles. */
export function PersonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.fullName,
    url: site.url,
    email: `mailto:${profile.email}`,
    jobTitle: profile.role,
    description: profile.intro,
    sameAs: profile.links.map((l) => l.href),
    worksFor: experience.filter((e) => !e.period.end && e.kind !== 'campus').map((e) => ({ '@type': 'Organization', name: e.org })),
    alumniOf: education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.school })),
    address: { '@type': 'PostalAddress', addressLocality: 'Raichur', addressRegion: 'Karnataka', addressCountry: 'IN' },
  };
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
