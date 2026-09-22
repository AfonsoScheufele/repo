import { useEffect, useState } from "react";
import { Preloader } from "./components/Preloader";
import { ScrollProgress } from "./components/ScrollProgress";
import { CaseStudyModal } from "./components/CaseStudyModal";
import { ModalProvider } from "./context/ModalContext";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { DomainStackSection } from "./sections/DomainStackSection";
import { FeaturedWork } from "./sections/FeaturedWork";
import { ContactSection } from "./sections/ContactSection";
import { FooterSection } from "./sections/FooterSection";
import { useLenis } from "./hooks/useLenis";
import { data } from "./data";
import { personalData } from "./data/personal";
import { AnimatePresence, motion } from "motion/react";

function Nav({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#sobre", label: "Sobre" },
    { href: "#projetos", label: "Projetos" },
    { href: "#contato", label: "Contato" },
    { href: personalData.cvPath, label: "CV", external: true },
    { href: data.profile.githubUrl, label: "GitHub", external: true },
  ];

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-400 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } ${scrolled ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-md" : "bg-transparent"}`}
    >
      <div className="flex items-center justify-between px-[5vw] py-4">
        <a
          href="#hero"
          className="font-display text-lg font-extrabold uppercase tracking-widest text-[var(--color-ink)]"
        >
          AS
        </a>

        <div className="hidden gap-7 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-muted)] md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              className="transition hover:text-[var(--color-accent)]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block h-px w-6 bg-[var(--color-ink)] transition ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-[var(--color-ink)] transition ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-[var(--color-ink)] transition ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg)] md:hidden"
          >
            <div className="flex flex-col gap-4 px-[5vw] py-5">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noopener noreferrer" : undefined}
                  className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  useLenis(ready);

  return (
    <ModalProvider>
      <Preloader onComplete={() => setReady(true)} />
      <ScrollProgress />
      <Nav visible={ready} />
      <main>
        <HeroSection ready={ready} />
        <AboutSection />
        <DomainStackSection />
        <FeaturedWork />
        <ContactSection />
      </main>
      <FooterSection />
      <CaseStudyModal />
    </ModalProvider>
  );
}
