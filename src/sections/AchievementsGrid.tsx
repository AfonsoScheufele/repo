import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import { data } from "../data";
import { motionTheme, scaleIn, staggerContainer } from "../motion.theme";
import { useReducedMotion } from "../hooks/useReducedMotion";
import type { Achievement } from "../lib/types";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: "all", label: "Todas" },
  { id: "github", label: "GitHub" },
  { id: "industrial", label: "Industrial" },
  { id: "software", label: "Software" },
] as const;

type Filter = (typeof categories)[number]["id"];

const categoryAccent: Record<string, string> = {
  github: "#ff5c35",
  industrial: "#c9a962",
  software: "#eceae6",
  personal: "#8a8580",
};

function AchievementCard({ item }: { item: Achievement }) {
  return (
    <motion.article
      layout
      variants={scaleIn}
      transition={motionTheme.ui}
      className="achievement-card group relative overflow-hidden border border-white/8 bg-[#0f0f0f] p-6"
    >
      <div
        className="absolute left-0 top-0 h-px w-0 bg-[#ff5c35] transition-all duration-500 group-hover:w-full"
        style={{ background: categoryAccent[item.category] ?? "#ff5c35" }}
      />
      <span className="text-[10px] uppercase tracking-[0.4em] text-[#8a8580]">
        {item.category}
      </span>
      <h3 className="mt-3 font-display text-2xl uppercase tracking-wide">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[#8a8580]">{item.description}</p>
      {item.repo && (
        <a
          href={`https://github.com/${data.profile.username}/${item.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-xs uppercase tracking-widest text-[#ff5c35] hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          Ver repo →
        </a>
      )}
    </motion.article>
  );
}

export function AchievementsGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const reduced = useReducedMotion();

  const filtered =
    filter === "all"
      ? data.achievements
      : data.achievements.filter((a) => a.category === filter);

  useGSAP(
    () => {
      if (reduced) return;

      ScrollTrigger.batch(".achievement-card", {
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 80, rotateX: 12 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              stagger: 0.08,
              duration: 0.8,
              ease: "power3.out",
              overwrite: true,
            },
          );
        },
        start: "top 92%",
      });
    },
    { scope: sectionRef, dependencies: [reduced, filter] },
  );

  return (
    <section ref={sectionRef} id="conquistas" className="px-[5vw] py-32">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerContainer}
        className="mb-16"
      >
        <motion.p
          variants={scaleIn}
          transition={motionTheme.gentle}
          className="text-xs uppercase tracking-[0.4em] text-[#ff5c35]"
        >
          Conquistas
        </motion.p>
        <motion.h2
          variants={scaleIn}
          transition={motionTheme.gentle}
          className="mt-2 font-display text-[clamp(3rem,10vw,7rem)] uppercase leading-none"
        >
          Hall of Fame
        </motion.h2>
      </motion.div>

      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setFilter(cat.id)}
            className={`relative px-5 py-2.5 text-xs uppercase tracking-widest transition ${
              filter === cat.id ? "text-[#eceae6]" : "text-[#8a8580] hover:text-[#eceae6]"
            }`}
          >
            {filter === cat.id && (
              <motion.span
                layoutId="ach-filter"
                className="absolute inset-0 border border-[#ff5c35]/40 bg-[#ff5c35]/10"
                transition={reduced ? { duration: 0 } : motionTheme.snap}
              />
            )}
            <span className="relative">{cat.label}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <AchievementCard key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
