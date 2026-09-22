import { personalData } from "../data/personal";
import { data } from "../data";

export function ContactSection() {
  const { contact, availableFor, cvPath } = personalData;

  return (
    <section id="contato" className="px-[5vw] py-24 md:py-32">
      <div className="mx-auto max-w-4xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
          Contato
        </p>
        <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase leading-none text-[var(--color-ink)]">
          Fala comigo
        </h2>
        <ul className="mt-8 space-y-2">
          {availableFor.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
              <span className="h-px w-5 bg-[var(--color-accent)]" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 font-mono text-xs text-[var(--color-steel)]">{contact.location}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${contact.email}`}
            className="bg-[var(--color-accent)] px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-white transition hover:bg-[var(--color-steel)]"
          >
            E-mail
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[var(--color-border)] px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-[var(--color-ink)] transition hover:border-[var(--color-steel)]"
          >
            LinkedIn
          </a>
          <a
            href={data.profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[var(--color-border)] px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-[var(--color-ink)] transition hover:border-[var(--color-steel)]"
          >
            GitHub
          </a>
          <a
            href={cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[var(--color-border)] px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
          >
            CV
          </a>
        </div>
      </div>
    </section>
  );
}
