import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion as useMotionReduced } from "motion/react";
import { animate } from "animejs";
import { data } from "../data";
import { fadeUp, motionTheme, scaleIn, staggerContainer } from "../motion.theme";
import { useReducedMotion } from "../hooks/useReducedMotion";
import type { Achievement } from "../lib/types";

const categories = [
  { id: "all", label: "Todas" },
  { id: "github", label: "GitHub" },
  { id: "career", label: "Carreira" },
  { id: "tech", label: "Tech" },
  { id: "personal", label: "Pessoal" },
] as const;

type Category = (typeof categories)[number]["id"];

function StatCounter({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) {
      if (ref.current) ref.current.textContent = `${value}${suffix}`;
      return;
    }

    const obj = { val: 0 };
    animate(obj, {
      val: value,
      round: 1,
      duration: 1800,
      ease: "outExpo",
      onUpdate: () => {
        if (ref.current) ref.current.textContent = `${obj.val}${suffix}`;
      },
    });
  }, [value, suffix, reduced]);

  return (
    <div className="flex flex-col gap-1">
      <span ref={ref} className="text-4xl font-bold tabular-nums sm:text-5xl">
        0{suffix}
      </span>
      <span className="text-sm text-zinc-400">{label}</span>
    </div>
  );
}

function AchievementCard({ item }: { item: Achievement }) {
  const categoryColors: Record<string, string> = {
    github: "from-violet-500/20 to-violet-500/5",
    career: "from-cyan-500/20 to-cyan-500/5",
    tech: "from-emerald-500/20 to-emerald-500/5",
    personal: "from-rose-500/20 to-rose-500/5",
  };

  return (
    <motion.div
      layout
      variants={scaleIn}
      transition={motionTheme.ui}
      className={`achievement-card glass-card rounded-2xl bg-gradient-to-br p-5 ${categoryColors[item.category] ?? ""}`}
    >
      <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        {item.category}
      </span>
      <h3 className="mt-2 font-display text-lg font-semibold">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
      {item.year && (
        <span className="mt-3 inline-block rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-zinc-500">
          {item.year}
        </span>
      )}
    </motion.div>
  );
}

export function StatsBento() {
  const [filter, setFilter] = useState<Category>("all");
  const motionReduced = useMotionReduced();

  const filtered =
    filter === "all"
      ? data.achievements
      : data.achievements.filter((a) => a.category === filter);

  return (
    <section id="conquistas" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mb-12 text-center"
        >
          <motion.p variants={fadeUp} transition={motionTheme.gentle} className="text-sm uppercase tracking-widest text-violet-400">
            Destaques
          </motion.p>
          <motion.h2 variants={fadeUp} transition={motionTheme.gentle} className="mt-2 text-4xl font-bold sm:text-5xl">
            Conquistas
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          <motion.div variants={scaleIn} transition={motionTheme.ui} className="glass-card col-span-2 rounded-2xl p-6 sm:col-span-1">
            <StatCounter value={data.stats.publicRepos} label="Repos públicos" />
          </motion.div>
          <motion.div variants={scaleIn} transition={motionTheme.ui} className="glass-card rounded-2xl p-6">
            <StatCounter value={data.stats.yearsOnGitHub} label="Anos no GitHub" suffix="+" />
          </motion.div>
          <motion.div variants={scaleIn} transition={motionTheme.ui} className="glass-card rounded-2xl p-6">
            <StatCounter value={data.stats.totalStars} label="Stars totais" />
          </motion.div>
          <motion.div
            variants={scaleIn}
            transition={motionTheme.ui}
            className="glass-card col-span-2 flex flex-col justify-center rounded-2xl p-6 sm:col-span-1"
          >
            <span className="text-4xl font-bold sm:text-5xl">{data.stats.languages.length || "—"}</span>
            <span className="text-sm text-zinc-400">
              {data.stats.languages.length > 0
                ? data.stats.languages.join(" · ")
                : "Linguagens"}
            </span>
          </motion.div>
        </motion.div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === cat.id ? "text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              {filter === cat.id && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-violet-600/30 border border-violet-500/40"
                  transition={motionReduced ? { duration: 0 } : motionTheme.snap}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <AchievementCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
