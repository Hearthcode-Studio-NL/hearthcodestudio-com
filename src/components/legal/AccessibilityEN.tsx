import Link from 'next/link';

export function AccessibilityEN() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1>Accessibility Statement</h1>
      <p className="hc-caption mt-2">Last updated: 18 May 2026.</p>

      <div className="mt-10 space-y-10">
        <section>
          <h2>Objective</h2>
          <p>
            HearthCode Studio strives for <Link href="/en">hearthcodestudio.com</Link> to fully
            comply with the{' '}
            <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener noreferrer">
              Web Content Accessibility Guidelines (WCAG) 2.2 Level AA
            </a>
            . Accessibility is not an afterthought &mdash; it is a design principle considered with
            every change to the site.
          </p>
        </section>

        <section>
          <h2>Compliance status</h2>
          <p>
            This site complies with WCAG 2.2 Level AA. Compliance was established through both
            automated and manual testing, conducted on 18 May 2026. There are currently no known
            inaccessible elements.
          </p>
        </section>

        <section>
          <h2>What was tested</h2>
          <p>
            The entire site was tested: the main page (six sections), the privacy policy, and this
            accessibility statement. The testing process includes:
          </p>
          <p className="mt-4">
            <strong>Automated checks.</strong> axe-core (WCAG 2.2 AA) via Playwright across three
            pages, in both desktop and mobile viewports &mdash; sixteen tests, zero violations.
            Google Lighthouse (mobile): score 100 on Performance, Accessibility, Best Practices, and
            SEO.
          </p>
          <p className="mt-4">
            <strong>Keyboard navigation.</strong> All interactive elements are reachable via Tab.
            Focus indicators are visible on every element. There are no keyboard traps. A skip link
            (&ldquo;Skip to main content&rdquo;) is the first focusable element on every page.
          </p>
          <p className="mt-4">
            <strong>Screen reader.</strong> Full walkthrough with NVDA on Chrome. Landmarks (banner,
            navigation, main content, contentinfo) are announced correctly. Heading levels follow a
            logical hierarchy (h1 &rarr; h2, no skipped levels). Interactive elements have clear
            labels. Dutch legal pages use <code className="text-sm">lang=&quot;nl&quot;</code> so
            screen readers apply the correct pronunciation.
          </p>
          <p className="mt-4">
            <strong>Visual checks.</strong> Zoom to 500% with no horizontal scrollbar. Colour
            contrast ratios verified: body text 8.4:1, CTA button text 6.3:1, accent text 7.0:1
            &mdash; all well above the AA requirement of 4.5:1. The site animation (subtle flame
            effect) is disabled when the user has the{' '}
            <code className="text-sm">prefers-reduced-motion</code> preference set.
          </p>
        </section>

        <section>
          <h2>Accessibility design choices</h2>
          <p>
            The site is built with semantic HTML, without custom widgets or ARIA overrides. All
            interactive elements are standard HTML links &mdash; the browser provides keyboard
            functionality. Fonts are self-hosted (no external requests to Google Fonts) and load
            with <code className="text-sm">font-display: swap</code> so text is immediately visible.
            There are no cookies, no forms, and no third-party scripts affecting the experience.
          </p>
        </section>

        <section>
          <h2>Known limitations</h2>
          <p>
            There are currently no known limitations. The site has been intentionally kept small
            (one page with six sections, two legal pages) and contains no forms, accounts, or
            transactions. When the site is expanded with new features, this statement will be
            updated and any temporary limitations will be listed here.
          </p>
        </section>

        <section>
          <h2>Report a problem</h2>
          <p>
            Experiencing an accessibility issue on this site? Send an email to{' '}
            <a href="mailto:info@hearthcodestudio.com?subject=Accessibility">
              info@hearthcodestudio.com
            </a>
            . Please describe where the problem occurs and which assistive technology you are using.
            A response will follow within two working days. If a reported issue cannot be resolved
            within six weeks, it will be listed here with an explanation and an alternative.
          </p>
        </section>

        <section>
          <h2>Enforcement</h2>
          <p>
            If you are not satisfied with the response to your report, you may file a complaint with
            the{' '}
            <a href="https://www.mensenrechten.nl" target="_blank" rel="noopener noreferrer">
              Netherlands Institute for Human Rights
            </a>
            .
          </p>
        </section>

        <section>
          <h2>About this statement</h2>
          <p>
            This statement was drawn up on 24 April 2026 and last updated on 18 May 2026, based on a
            self-assessment using the tooling described above. The statement is reviewed annually or
            immediately upon a major change to the site.
          </p>
        </section>
      </div>
    </article>
  );
}
