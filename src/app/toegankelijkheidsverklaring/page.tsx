import Link from 'next/link';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Toegankelijkheidsverklaring',
  description: 'Toegankelijkheidsverklaring voor hearthcodestudio.com volgens WCAG 2.2 AA.',
};

export default function AccessibilityStatementPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1>Toegankelijkheidsverklaring</h1>
      <p className="hc-caption mt-2">Versie 1 — 24 april 2026.</p>

      <div className="mt-10 space-y-10">
        <section>
          <h2>Doelstelling</h2>
          <p>
            HearthCode Studio streeft ernaar dat <Link href="/">hearthcodestudio.com</Link> voldoet
            aan de{' '}
            <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener noreferrer">
              WCAG 2.2 niveau AA
            </a>
            . Deze verklaring beschrijft de huidige status en hoe je problemen kunt melden.
          </p>
        </section>

        <section>
          <h2>Naleving</h2>
          <p>
            De site is ontworpen en gebouwd met toegankelijkheid als uitgangspunt: donker-eerst met
            voldoende contrast (minimaal 4.5:1 voor bodytekst), toetsenbordnavigatie, zichtbare
            focus-indicatoren, semantische HTML, en respect voor <code>prefers-reduced-motion</code>
            . Geautomatiseerde controles (axe-core in unit tests, Lighthouse in CI) dekken circa
            30–40% van de WCAG-richtlijnen af; de overige punten worden handmatig gecontroleerd vóór
            elke release.
          </p>
        </section>

        <section>
          <h2>Bekende beperkingen</h2>
          <p>
            Deze v1-versie is bewust klein gehouden (één pagina met zes secties, twee legal pages).
            Er zijn op dit moment geen bekende niet-toegankelijke elementen. Mocht je er een
            tegenkomen, meld het.
          </p>
        </section>

        <section>
          <h2>Problemen melden</h2>
          <p>
            Stuur een e-mail naar{' '}
            <a href="mailto:hallo@hearthcodestudio.com?subject=Toegankelijkheid">
              hallo@hearthcodestudio.com
            </a>
            . Een reactie volgt binnen twee werkdagen. Als een gerapporteerd probleem niet binnen
            zes weken kan worden opgelost, wordt dit hier genoemd met een toelichting en een
            alternatief.
          </p>
        </section>

        <section>
          <h2>Opstelling</h2>
          <p>
            Deze verklaring is opgesteld op 24 april 2026 op basis van een zelfevaluatie. Hij wordt
            jaarlijks herzien of direct bij een grote wijziging aan de site.
          </p>
        </section>
      </div>
    </article>
  );
}
