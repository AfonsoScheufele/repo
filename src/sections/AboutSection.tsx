import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { data } from "../data";
import { personalData } from "../data/personal";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      ScrollTrigger.batch(".about-reveal", {
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, stagger: 0.08, duration: 0.65, ease: "power2.out" },
          );
        },
        start: "top 88%",
        once: true,
      });
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section ref={sectionRef} id="sobre" className="px-[5vw] py-24 md:py-32">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
        <img
          src={data.profile.avatarUrl}
          alt={data.profile.name}
          className="about-reveal h-36 w-36 rounded-full border border-[var(--color-border)] object-cover md:h-44 md:w-44"
          width={176}
          height={176}
          style={reduced ? undefined : { opacity: 0 }}
        />
        <div>
          <p className="about-reveal font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-accent)]" style={reduced ? undefined : { opacity: 0 }}>
            Sobre
          </p>
          <h2
            className="about-reveal mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-bold uppercase leading-none text-[var(--color-ink)]"
            style={reduced ? undefined : { opacity: 0 }}
          >
            {personalData.headline}
          </h2>
          <div className="mt-8 max-w-2xl space-y-4">
            {personalData.bio.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="about-reveal text-base leading-relaxed text-[var(--color-muted)] md:text-lg"
                style={reduced ? undefined : { opacity: 0 }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
