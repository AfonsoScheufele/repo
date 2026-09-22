import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { data } from "../data";
import { RepoCard } from "../components/RepoCard";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      ScrollTrigger.batch(".work-card", {
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 44 },
            { opacity: 1, y: 0, stagger: 0.08, duration: 0.65, ease: "power2.out" },
          );
        },
        start: "top 92%",
        once: true,
      });
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section ref={sectionRef} id="projetos" className="px-[5vw] py-24 md:py-32">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
        Projetos
      </p>
      <h2 className="mt-2 font-display text-[clamp(2.2rem,6vw,4rem)] font-bold uppercase leading-none text-[var(--color-ink)]">
        Selecionados
      </h2>
      <p className="mt-4 max-w-lg text-sm text-[var(--color-muted)]">
        Sete projetos. Clique no card pra ver o case.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {data.repos.map((repo, i) => (
          <div key={repo.name} className="work-card" style={reduced ? undefined : { opacity: 0 }}>
            <RepoCard repo={repo} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
