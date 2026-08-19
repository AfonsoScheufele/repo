import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate, stagger } from "animejs";
import { data } from "../data";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection({ ready = true }: { ready?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const firstName = data.profile.name.split(" ")[0].toUpperCase();
  const lastName = data.profile.name.split(" ").slice(1).join(" ").toUpperCase() || "SCHEUFELE";

  useEffect(() => {
    if (reduced || !ready) return;

    const chars = sectionRef.current?.querySelectorAll(".hero-char");
    if (!chars?.length) return;

    animate(chars, {
      translateY: ["110%", "0%"],
      opacity: [0, 1],
      delay: stagger(25, { start: 300 }),
      duration: 1100,
      ease: "outExpo",
    });

    if (subRef.current) {
      animate(subRef.current, {
        opacity: [0, 1],
        translateY: [30, 0],
        delay: 1200,
        duration: 900,
        ease: "outExpo",
      });
    }

    if (scrollHintRef.current) {
      animate(scrollHintRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        delay: 1800,
        duration: 700,
        ease: "outQuad",
      });
    }
  }, [reduced, ready]);

  useGSAP(
    () => {
      if (reduced) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      tl.to(nameRef.current, { scale: 0.75, y: -80, opacity: 0.15 }, 0)
        .to(gridRef.current, { y: 100, opacity: 0.15 }, 0)
        .to(lineRef.current, { xPercent: -30, opacity: 0 }, 0)
        .to(subRef.current, { y: -40, opacity: 0 }, 0)
        .to(scrollHintRef.current, { opacity: 0 }, 0);
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  const renderLine = (text: string, key: string) => (
    <div key={key} className="hero-name-line">
      {text.split("").map((char, i) => (
        <span
          key={`${key}-${i}`}
          className="hero-char font-display text-[clamp(3.5rem,16vw,14rem)] tracking-tight text-[#eceae6]"
          style={reduced ? {} : { opacity: 0 }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100dvh] flex-col justify-end px-[5vw] pb-16 pt-32"
    >
      <div
        ref={gridRef}
        className="hero-grid pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      />
      <div
        ref={lineRef}
        className="pointer-events-none absolute top-1/3 left-0 h-px w-[120%] bg-gradient-to-r from-transparent via-[#ff5c35]/30 to-transparent"
        aria-hidden
      />

      <div ref={nameRef} className="relative z-10 select-none">
        {renderLine(firstName, "first")}
        {renderLine(lastName, "last")}
      </div>

      <p
        ref={subRef}
        className="relative z-10 mt-6 max-w-xl text-sm uppercase tracking-[0.35em] text-[#8a8580]"
        style={reduced ? { opacity: 1 } : { opacity: 0 }}
      >
        {data.profile.location ?? "Brasil"} · @{data.profile.username} · Dev & Industrial
      </p>

      <div
        ref={scrollHintRef}
        className="absolute bottom-10 left-[5vw] flex items-center gap-3 text-xs uppercase tracking-widest text-[#8a8580]"
        style={reduced ? { opacity: 1 } : { opacity: 0 }}
      >
        <span className="block h-px w-12 bg-[#ff5c35]" />
        Scroll
      </div>
    </section>
  );
}
