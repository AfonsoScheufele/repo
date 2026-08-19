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
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=120%",
              pin: pinRef.current,
              scrub: 1,
            },
          },
        );
      });

      ScrollTrigger.batch(".timeline-event", {
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, x: -24 },
            { opacity: 1, x: 0, stagger: 0.1, duration: 0.6 },
          );
        },
        start: "top 88%",
      });
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section ref={sectionRef} id="timeline" className="px-[5vw] py-24">
      <div ref={pinRef}>
        <p className="text-xs uppercase tracking-[0.4em] text-[#ff5c35]">Jornada</p>
        <h2 className="mt-2 font-display text-[clamp(3rem,10vw,7rem)] uppercase leading-none">
          Timeline
        </h2>

        <div className="relative mt-16">
          <div
            ref={lineRef}
            className="absolute left-4 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-[#ff5c35] to-[#c9a962] md:block"
            aria-hidden
          />

          <div className="space-y-8 md:space-y-12">
            {data.timeline.map((event, i) => (
              <div
                key={event.id}
                className={`timeline-event relative flex gap-8 md:pl-12 ${
                  i % 2 === 0 ? "" : "md:flex-row-reverse md:pr-12 md:pl-0 md:text-right"
                }`}
                style={reduced ? { opacity: 1 } : { opacity: 0 }}
              >
                <span className="hidden font-display text-5xl text-white/10 md:block md:w-24 md:shrink-0">
                  {event.year}
                </span>
                <div className="border border-white/8 bg-[#0f0f0f] p-5 md:max-w-md">
                  <span className="font-display text-2xl text-[#ff5c35] md:hidden">
                    {event.year}
                  </span>
                  <h3 className="mt-1 font-display text-xl uppercase">{event.title}</h3>
                  <p className="mt-2 text-sm text-[#6b6560]">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
