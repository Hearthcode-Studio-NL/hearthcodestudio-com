import { Approach } from '@/components/sections/Approach';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { Person } from '@/components/sections/Person';
import { Work } from '@/components/sections/Work';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Approach />
      <Person />
      <Work />
      <Contact />
    </>
  );
}
