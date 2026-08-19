import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { data } from "../data";
import { useReducedMotion } from "../hooks/useReducedMotion";

const TAGS = [
  ...data.stats.languages,
  "IIoT",
  "OPC-UA",
  "Event Sourcing",
  "Digital Twin",
  "TensorFlow",
  "Three.js",
  "React",
  "Node.js",
];

export function MarqueeSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const text = TAGS.filter(Boolean).join("  ·  ") + "  ·  ";

  useGSAP(
    () => {
      if (reduced || !trackRef.current) return;

      gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1,
      });
    },
    { dependencies: [reduced] },
  );

  return (
    <section className="overflow-hidden border-y border-white/5 py-6">
      <div ref={trackRef} className="marquee-track">
        {[text, text].map((chunk, i) => (
          <span
            key={i}
            className="whitespace-nowrap px-4 font-display text-[clamp(2rem,5vw,4rem)] uppercase tracking-wider text-[#ff5c35]/80"
          >
            {chunk}
          </span>
        ))}
      </div>
    </section>
  );
}
