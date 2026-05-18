import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'Privacyverklaring voor bezoekers van hearthcodestudio.com.',
};

export default function PrivacyPage() {
  return (
    <article lang="nl" className="mx-auto max-w-3xl px-6 py-16">
      <h1>Privacyverklaring</h1>
      <p className="hc-caption mt-2">
        Laatst bijgewerkt: 18 mei 2026. Deze privacyverklaring wordt bijgewerkt wanneer de website
        of gegevensverwerking verandert.
      </p>

      <div className="mt-10 space-y-10">
        <section>
          <h2>Wie we zijn</h2>
          <p>
            HearthCode Studio is een Nederlandse eenmanszaak. KvK-nummer: 42047881,
            BTW-identificatienummer: NL005456707B34 (startdatum 1 mei 2026). Voor vragen over dit
            privacybeleid: <a href="mailto:info@hearthcodestudio.com">info@hearthcodestudio.com</a>.
          </p>
        </section>

        <section>
          <h2>Welke gegevens deze site verwerkt</h2>
          <p>
            Deze website is een statische presentatiepagina. Er zijn geen formulieren, geen cookies
            en geen third-party analytics. De enige uitgaande verbinding die je browser kan maken is
            naar Vercel, waar de site wordt gehost. Vercel logt standaard bezoekmetadata (IP-adres,
            user-agent, tijdstip) voor korte tijd ten behoeve van beschikbaarheid en
            misbruikpreventie.
          </p>
        </section>

        <section>
          <h2>Contact via e-mail</h2>
          <p>
            Als je contact opneemt via{' '}
            <a href="mailto:info@hearthcodestudio.com">info@hearthcodestudio.com</a>, bewaart
            HearthCode Studio je bericht en e-mailadres zolang dat nodig is om je vraag te
            beantwoorden, en maximaal twee jaar daarna voor eventuele opvolging. Je kunt op elk
            moment vragen om verwijdering.
          </p>
        </section>

        <section>
          <h2>Jouw rechten</h2>
          <p>
            Onder de AVG heb je recht op inzage, correctie en verwijdering van je gegevens, en het
            recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens. Stuur een e-mail
            als je een verzoek wilt indienen.
          </p>
        </section>

        <section>
          <h2>Wijzigingen</h2>
          <p>
            Deze verklaring wordt aangepast wanneer de site wijzigingen ondergaat die de privacy
            raken — bijvoorbeeld het toevoegen van een contactformulier of analytics. Materiële
            wijzigingen worden op deze pagina gedateerd.
          </p>
        </section>
      </div>
    </article>
  );
}
