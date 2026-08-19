import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { data } from "../data";
import { motionTheme, scaleIn } from "../motion.theme";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function ReposGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      ScrollTrigger.batch(".repo-card", {
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 60, rotateX: 8 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              stagger: 0.1,
              duration: 0.7,
              ease: "power3.out",
            },
          );
        },
        onLeaveBack: (batch) => {
          gsap.set(batch, { opacity: 0, y: 60 });
        },
        start: "top 90%",
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section ref={sectionRef} id="repos" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-widest text-emerald-400">Open Source</p>
          <h2 className="mt-2 text-4xl font-bold sm:text-5xl">Repositórios</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {data.repos.map((repo) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-card glass-card group block rounded-2xl p-6"
              style={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
              whileHover={reducedMotion ? {} : { y: -4, transition: motionTheme.snap }}
              whileTap={reducedMotion ? {} : { scale: 0.98 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-semibold group-hover:text-violet-300 transition-colors">
                    {repo.name}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400 line-clamp-2">
                    {repo.description ?? "Sem descrição"}
                  </p>
                </div>
                <svg
                  className="shrink-0 text-zinc-600 transition group-hover:text-violet-400"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 3h10v10M17 3L8 12" />
                </svg>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    {repo.language}
                  </span>
                )}
                <span>★ {repo.stars}</span>
                {repo.topics.slice(0, 3).map((topic) => (
                  <span key={topic} className="rounded-full bg-white/5 px-2 py-0.5">
                    {topic}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>

        {data.repos.length === 0 && (
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
            transition={motionTheme.gentle}
            className="text-center text-zinc-500"
          >
            Nenhum repositório público encontrado.
          </motion.p>
        )}
      </div>
    </section>
  );
}
