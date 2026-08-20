import { motion } from "motion/react";
import { personalData } from "../data/personal";
import { MagneticLink } from "../components/MagneticLink";
import { motionTheme } from "../motion.theme";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function ContactSection() {
  const reduced = useReducedMotion();
  const { contact, availableFor, cvPath } = personalData;

  return (
    <section id="contato" className="px-[5vw] py-24 md:py-32">
      <div className="mx-auto max-w-6xl border border-white/8 bg-[#0a0a0a] p-8 md:p-14">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#ff5c35]">Disponível para</p>
            <h2 className="mt-3 font-display text-[clamp(2.5rem,7vw,5rem)] uppercase leading-none text-[#eceae6]">
              Vamos conversar
            </h2>
            <ul className="mt-8 space-y-3">
              {availableFor.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-[#a1a1aa]"
                >
                  <span className="h-px w-6 bg-[#ff5c35]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-between gap-8">
            <div className="space-y-4 text-sm">
              <a
                href={`mailto:${contact.email}`}
                className="block text-[#eceae6] transition hover:text-[#ff5c35]"
              >
                {contact.email}
              </a>
              <p className="text-[#6b6560]">{contact.location}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <MagneticLink>
                <motion.a
                  href={`mailto:${contact.email}`}
                  className="inline-flex border border-[#ff5c35] bg-[#ff5c35] px-5 py-3 text-xs uppercase tracking-widest text-[#050505] transition hover:bg-transparent hover:text-[#ff5c35]"
                  whileHover={reduced ? {} : { scale: 1.02 }}
                  transition={motionTheme.snap}
                >
                  Enviar e-mail
                </motion.a>
              </MagneticLink>
              <MagneticLink>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex border border-white/15 px-5 py-3 text-xs uppercase tracking-widest text-[#eceae6] transition hover:border-[#ff5c35]/40 hover:text-[#ff5c35]"
                >
                  LinkedIn
                </a>
              </MagneticLink>
              <MagneticLink>
                <a
                  href={cvPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex border border-white/15 px-5 py-3 text-xs uppercase tracking-widest text-[#eceae6] transition hover:border-[#ff5c35]/40 hover:text-[#ff5c35]"
                >
                  Ver CV
                </a>
              </MagneticLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
