import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';

/** Every page except the printable résumé gets the site chrome. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
