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

    const format = (n: number) => `${Math.round(n)}${stat.suffix ?? ""}`;

    if (reduced) {
      ref.current.textContent = format(stat.value);
      return;
    }

    const obj = { val: 0 };
    const anim = animate(obj, {
      val: stat.value,
      duration: 1800,
      ease: "outExpo",
      onUpdate: () => {
        if (ref.current) ref.current.textContent = format(obj.val);
      },
      onComplete: () => {
        if (ref.current) ref.current.textContent = format(stat.value);
      },
    });

    return () => {
      anim.pause();
    };
  }, [active, stat, reduced]);

  return (
    <div className="min-w-0 overflow-hidden border-t border-white/10 pt-6">
      <span
        ref={ref}
        className="block truncate font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-none tabular-nums tracking-tight text-[#ff5c35]"
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
          { opacity: 0, x: -40 },
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
    <section ref={sectionRef} className="relative overflow-hidden">
      <div ref={pinRef} className="flex min-h-screen flex-col justify-center px-[5vw] py-24">
        <p className="stat-label-big mb-4 text-xs uppercase tracking-[0.4em] text-[#ff5c35]">
          Números
        </p>
        {lastPushLabel && (
          <p className="stat-label-big mb-12 text-xs text-[#6b6560]">
            Último push · {lastPushLabel}
          </p>
        )}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 lg:gap-x-8">
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} stat={stat} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
