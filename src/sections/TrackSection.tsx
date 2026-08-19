import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { data } from "../data";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function TrackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const industrialRef = useRef<HTMLDivElement>(null);
  const softwareRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const industrialRepos = data.repos.filter((r) => r.category === "industrial");
  const softwareRepos = data.repos.filter((r) => r.category === "software");

  useGSAP(
    () => {
      if (reduced) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=180%",
            pin: pinRef.current,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        tl.fromTo(
          industrialRef.current,
          { opacity: 1, y: 0 },
          { opacity: 0, y: -40, duration: 0.5 },
          0.4,
        )
          .fromTo(
            softwareRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.5 },
            0.4,
          );
      });

      ScrollTrigger.batch(".track-repo-item", {
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, stagger: 0.08, duration: 0.5, ease: "power2.out" },
          );
        },
        start: "top 90%",
      });
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  const RepoItem = ({ name, desc }: { name: string; desc: string | null }) => (
    <div className="track-repo-item border-t border-white/5 py-4">
      <h4 className="font-display text-xl uppercase text-[#eceae6]">{name}</h4>
      <p className="mt-1 text-sm text-[#6b6560] line-clamp-2">{desc}</p>
    </div>
  );

  return (
    <section ref={sectionRef} id="track" className="relative">
      <div ref={pinRef} className="min-h-screen px-[5vw] py-24 md:flex md:flex-col md:justify-center">
        <p className="mb-8 text-xs uppercase tracking-[0.4em] text-[#ff5c35]">Tracks</p>

        <div className="relative mb-12 grid grid-cols-2 gap-4 overflow-hidden">
          <div className="overflow-hidden">
            <div className="font-display text-[clamp(2.5rem,10vw,8rem)] uppercase leading-none text-[#eceae6]">
              INDUSTRIAL
            </div>
            <p className="mt-2 text-xs uppercase tracking-widest text-[#6b6560]">ON · Chão de fábrica</p>
          </div>
          <div className="overflow-hidden text-right">
            <div className="font-display text-[clamp(2.5rem,10vw,8rem)] uppercase leading-none text-[#ff5c35]">
              SOFTWARE
            </div>
            <p className="mt-2 text-xs uppercase tracking-widest text-[#6b6560]">OFF · Produto & código</p>
          </div>
        </div>

        <div className="relative grid gap-12 md:grid-cols-2">
          <div ref={industrialRef}>
            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-[#c9a962]">
              {industrialRepos.length} projetos
            </p>
            {industrialRepos.map((r) => (
              <RepoItem key={r.name} name={r.name} desc={r.description} />
            ))}
          </div>

          <div ref={softwareRef} className={reduced ? "" : "opacity-30 md:opacity-0"}>
            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-[#ff5c35]">
              {softwareRepos.length} projetos
            </p>
            {softwareRepos.map((r) => (
              <RepoItem key={r.name} name={r.name} desc={r.description} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
