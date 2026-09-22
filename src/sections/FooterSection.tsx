import { data } from "../data";
import { personalData } from "../data/personal";

export function FooterSection() {
  return (
    <footer className="border-t border-[var(--color-border)] px-[5vw] py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-muted)]">
          © {new Date().getFullYear()} {data.profile.name}
        </p>
        <div className="flex flex-wrap gap-5 font-mono text-[11px] uppercase tracking-widest text-[var(--color-steel)]">
          <a href={data.profile.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)]">
            GitHub
          </a>
          <a href={personalData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)]">
            LinkedIn
          </a>
          <a href={`mailto:${personalData.contact.email}`} className="hover:text-[var(--color-accent)]">
            E-mail
          </a>
          <a href={personalData.cvPath} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)]">
            CV
          </a>
        </div>
      </div>
    </footer>
  );
}
