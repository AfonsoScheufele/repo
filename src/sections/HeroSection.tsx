import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate, stagger } from "animejs";
import { data } from "../data";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !titleRef.current) return;

    const chars = titleRef.current.querySelectorAll(".hero-char");
    animate(chars, {
      opacity: [0, 1],
      translateY: [24, 0],
      delay: stagger(35, { start: 200 }),
      duration: 700,
      ease: "outExpo",
    });

    if (subtitleRef.current) {
      animate(subtitleRef.current, {
        opacity: [0, 1],
        translateY: [16, 0],
        delay: 600,
        duration: 800,
        ease: "outExpo",
      });
    }

    if (badgeRef.current) {
      const paths = badgeRef.current.querySelectorAll("path");
      paths.forEach((path, index) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;

        animate(path, {
          strokeDashoffset: [length, 0],
          delay: 900 + index * 120,
          duration: 1200,
          ease: "inOutSine",
        });
      });
    }
  }, [reducedMotion]);

  useGSAP(
    () => {
      if (reducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.to(orb1Ref.current, { y: 120, scale: 1.15 }, 0)
        .to(orb2Ref.current, { y: -80, x: 40 }, 0)
        .to(gridRef.current, { y: 60, opacity: 0.3 }, 0);
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  const name = data.profile.name;
  const splitName = name.split("");

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20"
    >
      <div
        ref={gridRef}
        className="hero-grid pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
      />
      <div
        ref={orb1Ref}
        className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"
        aria-hidden
      />
      <div
        ref={orb2Ref}
        className="pointer-events-none absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        <img
          src={data.profile.avatarUrl}
          alt={data.profile.name}
          className="mb-8 h-28 w-28 rounded-full border-2 border-white/10 shadow-2xl shadow-violet-500/20"
          width={112}
          height={112}
        />

        <div ref={badgeRef} className="mb-6" aria-hidden>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path
              d="M24 4L28 18H42L31 27L35 41L24 32L13 41L17 27L6 18H20L24 4Z"
              stroke="url(#starGrad)"
              strokeWidth="1.5"
              fill="none"
            />
            <defs>
              <linearGradient id="starGrad" x1="6" y1="4" x2="42" y2="41">
                <stop stopColor="#8b5cf6" />
                <stop offset="1" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h1
          ref={titleRef}
          className="text-5xl font-extrabold tracking-tight sm:text-7xl"
          aria-label={name}
        >
          {splitName.map((char, i) => (
            <span
              key={`${char}-${i}`}
              className="hero-char inline-block"
              style={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="mt-4 text-lg text-zinc-400 sm:text-xl"
          style={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
        >
          <span className="gradient-text font-semibold">@{data.profile.username}</span>
          {" · "}
          Membro GitHub desde {data.stats.memberSinceYear}
        </p>

        <a
          href={data.profile.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium transition hover:border-violet-500/50 hover:bg-violet-500/10"
        >
          Ver perfil no GitHub
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-zinc-600">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
