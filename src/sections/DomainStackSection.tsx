import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalData } from "../data/personal";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function DomainStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      ScrollTrigger.batch(".focus-card", {
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, stagger: 0.07, duration: 0.6, ease: "power2.out" },
          );
        },
        start: "top 90%",
        once: true,
      });
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section ref={sectionRef} id="foco" className="px-[5vw] py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
        O que eu faço
      </p>
      <h2 className="mt-2 font-display text-[clamp(2.2rem,6vw,4rem)] font-bold uppercase leading-none text-[var(--color-ink)]">
        Quatro frentes
      </h2>
      <p className="mt-4 max-w-lg text-sm text-[var(--color-muted)]">
        Backend, front, dados — e a base de automação que ainda molda como eu penso sistema.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {personalData.domains.map((domain, i) => (
          <article
            key={domain.id}
            className="focus-card border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
            style={reduced ? undefined : { opacity: 0 }}
          >
            <span className="font-mono text-xs text-[var(--color-steel)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-wide text-[var(--color-ink)]">
              {domain.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
              {domain.description}
            </p>
            <p className="mt-4 font-mono text-[11px] tracking-wide text-[var(--color-steel)]">
              {domain.tags.join(" · ")}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
