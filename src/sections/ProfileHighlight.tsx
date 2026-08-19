import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { animate } from "animejs";
import { data } from "../data";
import { motionTheme } from "../motion.theme";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function ProfileHighlight() {
  const starsRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const { profileReadme } = data;

  useEffect(() => {
    if (reduced || !starsRef.current) {
      if (starsRef.current) starsRef.current.textContent = String(profileReadme.stars);
      return;
    }

    const obj = { n: 0 };
    animate(obj, {
      n: profileReadme.stars,
      round: 1,
      duration: 1500,
      ease: "outExpo",
      onUpdate: () => {
        if (starsRef.current) starsRef.current.textContent = String(obj.n);
      },
    });
  }, [profileReadme.stars, reduced]);

  return (
    <section className="px-[5vw] py-16">
      <motion.a
        href={profileReadme.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block border border-white/8 bg-[#0f0f0f] p-8 transition hover:border-[#ff5c35]/30 md:p-12"
        whileHover={reduced ? {} : { y: -4 }}
        transition={motionTheme.ui}
      >
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#ff5c35]">Profile README</p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span
              ref={starsRef}
              className="font-display text-[clamp(4rem,12vw,8rem)] leading-none text-[#eceae6]"
            >
              0
            </span>
            <span className="ml-2 text-xl text-[#6b6560]">stars</span>
          </div>
          <p className="max-w-sm text-sm text-[#6b6560]">
            Vitrine profissional no GitHub — @{data.profile.username}
          </p>
        </div>
        <span className="mt-6 inline-block text-xs uppercase tracking-widest text-[#ff5c35] opacity-0 transition group-hover:opacity-100">
          Ver profile →
        </span>
      </motion.a>
    </section>
  );
}
