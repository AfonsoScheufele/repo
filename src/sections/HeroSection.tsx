import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { data } from "../data";
import { personalData } from "../data/personal";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection({ ready = true }: { ready?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      tl.to(nameRef.current, { y: -48, opacity: 0.25 }, 0).to(
        subRef.current,
        { y: -24, opacity: 0 },
        0,
      );
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[88vh] flex-col justify-end px-[5vw] pb-20 pt-32 md:pb-28 md:pt-40"
    >
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-80" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_10%,rgba(228,87,46,0.12),transparent_50%)]"
        aria-hidden
      />

      <div
        className={`relative z-10 max-w-4xl transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-steel)]">
          {personalData.contact.location} · @{data.profile.username}
        </p>
        <h1
          ref={nameRef}
          className="mt-4 font-display text-[clamp(2.75rem,11vw,6.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-[var(--color-ink)]"
        >
          {data.profile.name}
        </h1>
        <p
          ref={subRef}
          className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-muted)] md:text-xl"
        >
          {personalData.headline}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="#projetos"
            className="bg-[var(--color-accent)] px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-white transition hover:bg-[var(--color-steel)]"
          >
            Projetos
          </a>
          <a
            href="#contato"
            className="border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-[var(--color-ink)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            Contato
          </a>
          <a
            href={personalData.cvPath}
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
