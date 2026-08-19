import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { data } from "../data";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function JourneyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      const items = gsap.utils.toArray<HTMLElement>(".timeline-item");

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        },
      );

      ScrollTrigger.batch(items, {
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, x: -40 },
            { opacity: 1, x: 0, stagger: 0.12, duration: 0.6, ease: "power2.out" },
          );
        },
        onLeaveBack: (batch) => {
          gsap.set(batch, { opacity: 0, x: -40 });
        },
        start: "top 85%",
        end: "bottom 20%",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=800",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        ".journey-highlight",
        { opacity: 0.3, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1 },
      ).to(".journey-highlight", { opacity: 0.3, scale: 0.95, duration: 1 });
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section ref={sectionRef} id="jornada" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-widest text-cyan-400">Timeline</p>
          <h2 className="mt-2 text-4xl font-bold sm:text-5xl">Minha Jornada</h2>
        </div>

        <div
          ref={pinRef}
          className="journey-highlight glass-card mb-16 rounded-3xl p-8 text-center"
        >
          <p className="text-6xl font-extrabold gradient-text">{data.stats.yearsOnGitHub}+</p>
          <p className="mt-2 text-lg text-zinc-400">anos construindo no ecossistema dev</p>
        </div>

        <div className="relative">
          <div
            ref={lineRef}
            className="absolute left-4 top-0 h-full w-0.5 origin-top bg-gradient-to-b from-violet-500 to-cyan-400 sm:left-1/2 sm:-translate-x-px"
            aria-hidden
          />

          <div className="space-y-12">
            {data.timeline.map((event, i) => (
              <div
                key={event.id}
                className={`timeline-item relative flex gap-6 sm:gap-0 ${
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
                style={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
              >
                <div className="hidden flex-1 sm:block" />
                <div className="relative z-10 flex shrink-0 items-start sm:items-center sm:justify-center">
                  <div className="timeline-dot h-4 w-4 rounded-full bg-violet-500 ring-4 ring-violet-500/20" />
                </div>
                <div className="glass-card flex-1 rounded-2xl p-5 sm:max-w-md">
                  <span className="text-sm font-bold text-violet-400">{event.year}</span>
                  <h3 className="mt-1 font-display text-lg font-semibold">{event.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
