import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate } from "animejs";
import ParticleText from "../components/ParticleText";
import MoltenMetal from "../components/MoltenMetal";
import { data } from "../data";
import { personalData } from "../data/personal";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection({ ready = true }: { ready?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const moltenRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const fullName = data.profile.name.toUpperCase();

  useEffect(() => {
    if (!ready) return;

    if (subRef.current) {
      if (reduced) {
        subRef.current.style.opacity = "1";
      } else {
        animate(subRef.current, {
          opacity: [0, 1],
          translateY: [30, 0],
          delay: 900,
          duration: 900,
          ease: "outExpo",
        });
      }
    }

    if (scrollHintRef.current && !reduced) {
      animate(scrollHintRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        delay: 1400,
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

      tl.to(nameRef.current, { scale: 0.85, y: -60, opacity: 0.2 }, 0)
        .to(gridRef.current, { y: 100, opacity: 0.15 }, 0)
        .to(moltenRef.current, { opacity: 0.15, y: 40 }, 0)
        .to(subRef.current, { y: -40, opacity: 0 }, 0)
        .to(scrollHintRef.current, { opacity: 0 }, 0);
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex flex-col px-[5vw] pb-10 pt-28 md:pb-12 md:pt-32"
    >
      {!reduced && (
        <div
          ref={moltenRef}
          className="absolute inset-0 z-0 opacity-70"
          aria-hidden
        >
          <MoltenMetal
            color1="#3a1208"
            color2="#ff5c35"
            color3="#eceae6"
            speed={0.12}
            scale={3.4}
            detail={3}
            glow={1.5}
            coreSize={0.12}
            swirl={0.9}
            fold={-0.32}
            blackPoint={0.06}
            brightness={1.15}
            colorMode="ember"
            grain
            grainIntensity={0.035}
            mouseInteraction
            mouseStrength={0.25}
            opacity={0.85}
          />
        </div>
      )}
      <div
        ref={gridRef}
        className="hero-grid pointer-events-none absolute inset-0 z-[1] opacity-40"
        aria-hidden
      />

      <div className="pointer-events-none relative z-10 w-full [&>*]:pointer-events-auto">
        <div ref={nameRef} className="w-full select-none">
          {reduced || !ready ? (
            <div className="font-display text-[clamp(2.5rem,10vw,7rem)] leading-[0.9] tracking-tight text-[#eceae6]">
              {fullName}
            </div>
          ) : (
            <div className="h-[clamp(5.5rem,16vw,11rem)] w-full">
              <ParticleText
                text={fullName}
                particleSize={2.2}
                density={3}
                color="#eceae6"
                highlightColor="#ff5c35"
                scatter={160}
                gatherDuration={1600}
                stagger={420}
                pointerRepel={36}
                repelRadius={110}
                idleDrift={0.55}
                trigger="mount"
                fontSize="clamp(2.5rem, 10vw, 7rem)"
                fontWeight={400}
                fontFamily='"Bebas Neue", "Syne", system-ui, sans-serif'
                glow
              />
            </div>
          )}
        </div>

        <p
          ref={subRef}
          className="mt-4 max-w-xl text-sm uppercase tracking-[0.35em] text-[#8a8580]"
          style={reduced ? { opacity: 1 } : { opacity: 0 }}
        >
          {data.profile.location ?? "Brasil"} · @{data.profile.username} · Dev & Industrial
        </p>

        <div
          className="mt-6 flex flex-wrap gap-3"
          style={reduced || ready ? { opacity: 1 } : { opacity: 0 }}
        >
          <a
            href="#contato"
            className="border border-[#ff5c35] bg-[#ff5c35] px-5 py-2.5 text-xs uppercase tracking-widest text-[#050505] transition hover:bg-transparent hover:text-[#ff5c35]"
          >
            Disponível para projetos
          </a>
          <a
            href={personalData.cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/15 px-5 py-2.5 text-xs uppercase tracking-widest text-[#eceae6] transition hover:border-[#ff5c35]/40 hover:text-[#ff5c35]"
          >
            Ver CV
          </a>
          <a
            href="#sobre"
            className="border border-white/15 px-5 py-2.5 text-xs uppercase tracking-widest text-[#8a8580] transition hover:text-[#eceae6]"
          >
            Sobre mim
          </a>
        </div>

        <div
          ref={scrollHintRef}
          className="mt-8 flex items-center gap-3 text-xs uppercase tracking-widest text-[#8a8580]"
          style={reduced ? { opacity: 1 } : { opacity: 0 }}
        >
          <span className="block h-px w-12 bg-[#ff5c35]" />
          Scroll
        </div>
      </div>
    </section>
  );
}
