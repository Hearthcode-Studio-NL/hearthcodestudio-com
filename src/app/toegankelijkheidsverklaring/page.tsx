import Link from 'next/link';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Toegankelijkheidsverklaring',
  description: 'Toegankelijkheidsverklaring voor hearthcodestudio.com volgens WCAG 2.2 AA.',
};

export default function AccessibilityStatementPage() {
  return (
    <article lang="nl" className="mx-auto max-w-3xl px-6 py-16">
      <h1>Toegankelijkheidsverklaring</h1>
      <p className="hc-caption mt-2">Laatst bijgewerkt: 18 mei 2026.</p>

      <div className="mt-10 space-y-10">
        <section>
          <h2>Doelstelling</h2>
          <p>
            HearthCode Studio streeft ernaar dat <Link href="/">hearthcodestudio.com</Link> volledig
            voldoet aan de{' '}
            <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener noreferrer">
              Web Content Accessibility Guidelines (WCAG) 2.2 niveau AA
            </a>
            . Toegankelijkheid is geen bijzaak &mdash; het is een ontwerpuitgangspunt dat bij elke
            wijziging aan de site wordt meegewogen.
          </p>
        </section>

        <section>
          <h2>Nalevingsstatus</h2>
          <p>
            Deze site voldoet aan WCAG 2.2 niveau AA. De naleving is vastgesteld op basis van zowel
            geautomatiseerde als handmatige controles, uitgevoerd op 18 mei 2026. Er zijn op dit
            moment geen bekende niet-toegankelijke elementen.
          </p>
        </section>

        <section>
          <h2>Wat is er getest</h2>
          <p>
            De volledige site is getest: de hoofdpagina (zes secties), de privacyverklaring en deze
            toegankelijkheidsverklaring. De testprocedure omvat:
          </p>
          <p className="mt-4">
            <strong>Geautomatiseerde controles.</strong> axe-core (WCAG 2.2 AA) via Playwright op
            drie pagina&rsquo;s, in zowel desktop- als mobiele weergave &mdash; zestien tests, nul
            overtredingen. Google Lighthouse (mobiel): score 100 op Performance, Accessibility, Best
            Practices en SEO.
          </p>
          <p className="mt-4">
            <strong>Toetsenbordnavigatie.</strong> Alle interactieve elementen zijn bereikbaar via
            Tab. Focusindicatoren zijn zichtbaar op elk element. Er zijn geen toetsenbordvallen. Een
            skip-link (&ldquo;Skip to main content&rdquo;) is het eerste focuselement op elke
            pagina.
          </p>
          <p className="mt-4">
            <strong>Schermlezer.</strong> Volledige walkthrough met NVDA op Chrome. Landmarks
            (banner, navigatie, hoofdinhoud, contentinfo) worden correct aangekondigd. Kopniveaus
            volgen een logische hi&euml;rarchie (h1 &rarr; h2, geen overgeslagen niveaus).
            Interactieve elementen hebben duidelijke labels. De Nederlandse juridische
            pagina&rsquo;s gebruiken <code className="text-sm">lang=&quot;nl&quot;</code> zodat
            schermlezers de juiste uitspraak hanteren.
          </p>
          <p className="mt-4">
            <strong>Visuele controles.</strong> Zoom tot 500% zonder horizontale scrollbalk.
            Kleurcontrastverhoudingen gecontroleerd: bodytekst 8,4:1, CTA-knoptekst 6,3:1,
            accenttekst 7,0:1 &mdash; alle ruim boven de AA-eis van 4,5:1. De animatie op de site
            (subtiel vlameffect) wordt uitgeschakeld wanneer de gebruiker de voorkeur{' '}
            <code className="text-sm">prefers-reduced-motion</code> heeft ingesteld.
          </p>
        </section>

        <section>
          <h2>Ontwerpkeuzes voor toegankelijkheid</h2>
          <p>
            De site is gebouwd met semantische HTML, zonder aangepaste widgets of ARIA-overrides.
            Alle interactieve elementen zijn standaard HTML-links &mdash; de browser levert de
            toetsenbordfunctionaliteit. Lettertypen worden lokaal gehost (geen externe verzoeken
            naar Google Fonts) en laden met <code className="text-sm">font-display: swap</code>{' '}
            zodat tekst direct zichtbaar is. Er zijn geen cookies, geen formulieren en geen
            third-party scripts die de ervaring be&iuml;nvloeden.
          </p>
        </section>

        <section>
          <h2>Bekende beperkingen</h2>
          <p>
            Er zijn op dit moment geen bekende beperkingen. De site is bewust klein gehouden
            (&eacute;&eacute;n pagina met zes secties, twee juridische pagina&rsquo;s) en bevat geen
            formulieren, accounts of transacties. Wanneer de site wordt uitgebreid met nieuwe
            functies, wordt deze verklaring bijgewerkt en worden eventuele tijdelijke beperkingen
            hier vermeld.
          </p>
        </section>

        <section>
          <h2>Problemen melden</h2>
          <p>
            Ondervind je een toegankelijkheidsprobleem op deze site? Stuur een e-mail naar{' '}
            <a href="mailto:info@hearthcodestudio.com?subject=Toegankelijkheid">
              info@hearthcodestudio.com
            </a>
            . Vermeld waar het probleem zich voordoet en welke hulptechnologie je gebruikt. Een
            reactie volgt binnen twee werkdagen. Als een gerapporteerd probleem niet binnen zes
            weken kan worden opgelost, wordt dit hier genoemd met een toelichting en een
            alternatief.
          </p>
        </section>

        <section>
          <h2>Handhaving</h2>
          <p>
            Als je niet tevreden bent met de reactie op je melding, kun je een klacht indienen bij
            het{' '}
            <a href="https://www.mensenrechten.nl" target="_blank" rel="noopener noreferrer">
              College voor de Rechten van de Mens
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Over deze verklaring</h2>
          <p>
            Deze verklaring is opgesteld op 24 april 2026 en voor het laatst bijgewerkt op 18 mei
            2026, op basis van een zelfevaluatie met de hierboven beschreven tooling. De verklaring
            wordt jaarlijks herzien of direct bij een grote wijziging aan de site.
          </p>
        </section>
      </div>
    </article>
  );
}
