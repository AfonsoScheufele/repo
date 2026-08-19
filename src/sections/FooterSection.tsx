import { motion } from "motion/react";
import { data } from "../data";
import { fadeUp, motionTheme, staggerContainer } from "../motion.theme";

const stack = [
  { name: "GSAP", role: "Scroll & pin" },
  { name: "Anime.js", role: "Micro-interações" },
  { name: "Motion", role: "Blocos UI" },
];

export function FooterSection() {
  return (
    <footer className="border-t border-white/5 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col items-center gap-8 text-center"
        >
          <motion.div variants={fadeUp} transition={motionTheme.gentle}>
            <p className="text-sm text-zinc-500">
              Dados atualizados em{" "}
              {new Date(data.fetchedAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={motionTheme.gentle}
            className="flex flex-wrap justify-center gap-4"
          >
            {stack.map((item) => (
              <div
                key={item.name}
                className="glass-card rounded-xl px-4 py-3 text-left"
              >
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-zinc-500">{item.role}</p>
              </div>
            ))}
          </motion.div>

          <motion.p variants={fadeUp} transition={motionTheme.gentle} className="text-zinc-600 text-sm">
            Feito com React + Vite ·{" "}
            <a
              href={data.profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:underline"
            >
              @{data.profile.username}
            </a>
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
