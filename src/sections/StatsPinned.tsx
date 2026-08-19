import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate } from "animejs";
import { data } from "../data";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  value: number;
  label: string;
  suffix?: string;
}

function AnimatedStat({
  stat,
  active,
}: {
  stat: StatItem;
  active: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!active || !ref.current) return;
    if (reduced) {
      ref.current.textContent = `${stat.value}${stat.suffix ?? ""}`;
      return;
    }

    const obj = { val: 0 };
    animate(obj, {
      val: stat.value,
      round: 1,
      duration: 2200,
      ease: "outExpo",
      onUpdate: () => {
        if (ref.current) ref.current.textContent = `${obj.val}${stat.suffix ?? ""}`;
      },
    });
  }, [active, stat, reduced]);

  return (
    <div className="border-t border-white/10 pt-8">
      <span
        ref={ref}
        className="block font-display text-[clamp(4rem,12vw,9rem)] leading-none text-[#ff5c35]"
      >
        0{stat.suffix ?? ""}
      </span>
      <span className="mt-2 block text-xs uppercase tracking-[0.35em] text-[#8a8580]">
        {stat.label}
      </span>
    </div>
  );
}

export function StatsPinned() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const reduced = useReducedMotion();

  const stats: StatItem[] = [
    { value: data.stats.publicRepos, label: "Projetos" },
    { value: data.stats.followers, label: "Seguidores" },
    { value: data.stats.totalStars, label: "Stars" },
    { value: data.stats.languages.length, label: "Linguagens" },
  ];

  useGSAP(
    () => {
      if (reduced) {
        setActive(true);
        return;
      }

      ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top 40%",
        onEnter: () => setActive(true),
        once: true,
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          ".stat-label-big",
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=80%",
              pin: pinRef.current,
              scrub: 1,
            },
          },
        );
      });
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  const lastPushLabel = data.stats.lastPush
    ? new Date(data.stats.lastPush).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : null;

  return (
    <section ref={sectionRef} className="relative">
      <div ref={pinRef} className="flex min-h-screen flex-col justify-center px-[5vw] py-24">
        <p className="stat-label-big mb-4 text-xs uppercase tracking-[0.4em] text-[#ff5c35]">
          Números
        </p>
        {lastPushLabel && (
          <p className="stat-label-big mb-12 text-xs text-[#6b6560]">
            Último push · {lastPushLabel}
          </p>
        )}
        <div className="grid grid-cols-2 gap-x-12 gap-y-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} stat={stat} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
