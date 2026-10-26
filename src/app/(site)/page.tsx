import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/home/About';
import { Capabilities } from '@/components/home/Capabilities';
import { Contact } from '@/components/home/Contact';
import { Experience } from '@/components/home/Experience';
import { Proof } from '@/components/home/Proof';
import { Work } from '@/components/home/Work';
import { PersonJsonLd } from '@/components/site/PersonJsonLd';

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <Hero />
      <Proof />
      <Work />
      <Experience />
      <Capabilities />
      <About />
      <Contact />
    </>
  );
}
