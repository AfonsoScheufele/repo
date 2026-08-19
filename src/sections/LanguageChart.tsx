import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { data } from "../data";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00add8",
  Dockerfile: "#384d54",
  Shell: "#89e051",
};

export function LanguageChart() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      ScrollTrigger.batch(".lang-bar-row", {
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, stagger: 0.06, duration: 0.5 },
          );
        },
        start: "top 88%",
      });

      gsap.utils.toArray<HTMLElement>(".lang-bar-fill").forEach((bar) => {
        const pct = bar.dataset.percent ?? "0";
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${pct}%`,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  if (data.languageBreakdown.length === 0) return null;

  return (
    <section ref={sectionRef} className="px-[5vw] py-24">
      <p className="text-xs uppercase tracking-[0.4em] text-[#ff5c35]">Stack</p>
      <h2 className="mt-2 font-display text-[clamp(2rem,8vw,5rem)] uppercase leading-none">
        Linguagens
      </h2>

      <div className="mt-12 max-w-xl space-y-5">
        {data.languageBreakdown.map((lang) => (
          <div key={lang.name} className="lang-bar-row">
            <div className="mb-2 flex justify-between text-xs uppercase tracking-widest">
              <span className="text-[#eceae6]">{lang.name}</span>
              <span className="text-[#6b6560]">{lang.percent}%</span>
            </div>
            <div className="h-1.5 bg-white/5">
              <div
                className="lang-bar-fill h-full"
                data-percent={lang.percent}
                style={{
                  width: reduced ? `${lang.percent}%` : "0%",
                  background: LANG_COLORS[lang.name] ?? "#ff5c35",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
