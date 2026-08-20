import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: "hero", label: "01" },
  { id: "sobre", label: "02" },
  { id: "track", label: "03" },
  { id: "repos", label: "04" },
  { id: "contato", label: "05" },
];

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !barRef.current) return;

    gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      },
    );
  }, [reduced]);

  return (
    <>
      <div className="fixed top-0 left-0 z-[60] h-[2px] w-full bg-white/5">
        <div
          ref={barRef}
          className="h-full origin-left bg-[#ff5c35]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <nav
        className="fixed right-6 top-1/2 z-[40] hidden -translate-y-1/2 flex-col gap-4 lg:flex"
        aria-label="Seções"
      >
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#6b6560] transition hover:text-[#ff5c35]"
          >
            <span className="h-px w-0 bg-[#ff5c35] transition-all group-hover:w-4" />
            {s.label}
          </a>
        ))}
      </nav>
    </>
  );
}
