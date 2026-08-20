import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { data } from "../data";
import { personalData } from "../data/personal";
import { fadeUp, motionTheme, staggerContainer } from "../motion.theme";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      ScrollTrigger.batch(".about-reveal", {
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power3.out" },
          );
        },
        start: "top 88%",
      });
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section ref={sectionRef} id="sobre" className="px-[5vw] py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div className="about-reveal" style={reduced ? { opacity: 1 } : { opacity: 0 }}>
          <img
            src={data.profile.avatarUrl}
            alt={data.profile.name}
            className="h-40 w-40 rounded-full border border-white/10 object-cover shadow-2xl shadow-[#ff5c35]/10 md:h-52 md:w-52"
            width={208}
            height={208}
          />
          <p className="mt-8 text-xs uppercase tracking-[0.4em] text-[#ff5c35]">Sobre mim</p>
          <h2 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] uppercase leading-none text-[#eceae6]">
            {personalData.headline}
          </h2>
          <p className="mt-4 text-sm text-[#6b6560]">{personalData.contact.location}</p>
        </div>

        <div className="space-y-6">
          {personalData.bio.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="about-reveal text-base leading-relaxed text-[#a1a1aa] md:text-lg"
              style={reduced ? { opacity: 1 } : { opacity: 0 }}
            >
              {paragraph}
            </p>
          ))}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
            className="mt-10 grid gap-4 sm:grid-cols-3"
          >
            <motion.div
              variants={fadeUp}
              transition={motionTheme.gentle}
              className="border border-white/8 bg-[#0f0f0f] p-5"
            >
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#ff5c35]">Missão</p>
              <p className="mt-3 text-sm leading-relaxed text-[#eceae6]">{personalData.mission}</p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              transition={motionTheme.gentle}
              className="border border-white/8 bg-[#0f0f0f] p-5"
            >
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#c9a962]">Visão</p>
              <p className="mt-3 text-sm leading-relaxed text-[#eceae6]">{personalData.vision}</p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              transition={motionTheme.gentle}
              className="border border-white/8 bg-[#0f0f0f] p-5"
            >
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#8a8580]">Valores</p>
              <ul className="mt-3 space-y-2">
                {personalData.values.map((v) => (
                  <li key={v.title}>
                    <span className="text-sm font-medium text-[#eceae6]">{v.title}</span>
                    <span className="block text-xs text-[#6b6560]">{v.description}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
