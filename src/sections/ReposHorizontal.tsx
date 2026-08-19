import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { data } from "../data";
import { RepoCard } from "../components/RepoCard";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function ReposHorizontal() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !trackRef.current || !sectionRef.current) return;

      const track = trackRef.current;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const scrollTween = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        gsap.utils.toArray<HTMLElement>(".repo-thumb").forEach((thumb) => {
          gsap.fromTo(
            thumb,
            { opacity: 0.5, scale: 0.96 },
            {
              opacity: 1,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: thumb,
                containerAnimation: scrollTween,
                start: "left 92%",
                end: "left 40%",
                scrub: true,
              },
            },
          );
        });
      });
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section ref={sectionRef} id="repos" className="relative overflow-hidden">
      <div className="mb-12 px-[5vw] pt-24">
        <p className="text-xs uppercase tracking-[0.4em] text-[#ff5c35]">Repositórios</p>
        <h2 className="mt-2 font-display text-[clamp(3rem,10vw,7rem)] uppercase leading-none">
          Hall of Code
        </h2>
        <p className="mt-4 max-w-lg text-sm text-[#6b6560]">
          Galeria horizontal — clique para case study ou link direto ao GitHub.
        </p>
        <p className="mt-2 text-xs uppercase tracking-widest text-[#ff5c35] md:hidden">
          Deslize →
        </p>
      </div>

      <div
        ref={trackRef}
        className="horizontal-panel horizontal-panel-mobile pb-24"
      >
        {data.repos.map((repo, i) => (
          <RepoCard key={repo.name} repo={repo} index={i} />
        ))}
      </div>
    </section>
  );
}
