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
      ScrollTrigger.batch(".domain-card", {
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, stagger: 0.08, duration: 0.65, ease: "power3.out" },
          );
        },
        start: "top 90%",
      });
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section ref={sectionRef} id="stack" className="px-[5vw] py-24">
      <p className="text-xs uppercase tracking-[0.4em] text-[#ff5c35]">Competências</p>
      <h2 className="mt-2 font-display text-[clamp(2.5rem,8vw,5.5rem)] uppercase leading-none">
        Domínios
      </h2>
      <p className="mt-4 max-w-xl text-sm text-[#6b6560]">
        Além das linguagens — o que eu construo de ponta a ponta.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {personalData.domains.map((domain, i) => (
          <article
            key={domain.id}
            className="domain-card border border-white/8 bg-[#0a0a0a] p-6 transition hover:border-[#ff5c35]/25"
            style={reduced ? { opacity: 1 } : { opacity: 0 }}
          >
            <span className="font-display text-4xl text-white/5">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 font-display text-2xl uppercase tracking-wide text-[#eceae6]">
              {domain.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#6b6560]">{domain.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {domain.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-white/10 px-2 py-1 text-[10px] uppercase tracking-wider text-[#8a8580]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
