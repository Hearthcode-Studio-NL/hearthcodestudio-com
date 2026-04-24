export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-24 pb-32">
      <h2 className="mb-8">Start a conversation</h2>
      <p className="mb-8 text-lg leading-relaxed">
        Email is the best way in. Expect a reply within a day or two — usually sooner, occasionally
        slower when something non-trivial is in flight.
      </p>
      <a
        href="mailto:hallo@hearthcodestudio.com"
        className="font-heading inline-block text-2xl text-[color:var(--color-accent-gold)] md:text-3xl"
      >
        hallo@hearthcodestudio.com
      </a>
      <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm">
        <li>
          <a
            href="https://github.com/Hearthcode-Studio-NL"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/company/hearthcodestudio"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/hearthcodestudio"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </li>
      </ul>
    </section>
  );
}
