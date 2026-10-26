import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import { profile } from '@/content';
import { site } from '@/lib/site';
import '@/styles/globals.css';

const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--ff-serif' });
const sans = Geist({ subsets: ['latin'], variable: '--ff-sans' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--ff-mono' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  authors: [{ name: profile.name, url: site.url }],
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: site.name, title: site.title, description: site.description, url: site.url },
  twitter: { card: 'summary_large_image', creator: '@Shubham_dubey4', title: site.title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#08080a' },
    { media: '(prefers-color-scheme: light)', color: '#f3f1ec' },
  ],
};

/** Runs before paint so the stored or system theme never flashes. */
const themeScript = `(()=>{try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t;document.documentElement.classList.add('js')}catch(e){document.documentElement.dataset.theme='dark'}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
