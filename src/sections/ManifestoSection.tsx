import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const QUOTE =
  "Não importa onde você começa — o que define é como você evolui a partir daí.";

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const words = QUOTE.split(" ");

  useGSAP(
    () => {
      if (reduced) return;

      const wordEls = gsap.utils.toArray<HTMLElement>(".manifesto-word");

      gsap.set(wordEls, { opacity: 0.12, y: 40 });

      gsap.to(wordEls, {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          pin: pinRef.current,
          scrub: 1,
          anticipatePin: 1,
        },
      });
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section ref={sectionRef} className="relative">
      <div
        ref={pinRef}
        className="flex min-h-screen items-center px-[5vw] py-24"
      >
        <blockquote className="max-w-5xl font-display text-[clamp(2.5rem,7vw,5.5rem)] uppercase leading-[1.05] tracking-tight text-[#eceae6]">
          {words.map((word, i) => (
            <span
              key={i}
              className="manifesto-word mr-[0.3em] inline-block"
              style={reduced ? { opacity: 1 } : undefined}
            >
              {word}
            </span>
          ))}
        </blockquote>
      </div>
    </section>
  );
}
