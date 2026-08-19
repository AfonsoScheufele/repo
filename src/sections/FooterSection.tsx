import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { MagneticLink } from "../components/MagneticLink";
import { data } from "../data";
import { motionTheme } from "../motion.theme";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !textRef.current) return;

      gsap.fromTo(
        textRef.current,
        { xPercent: 8 },
        {
          xPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  const socials = [
    { label: "GitHub", href: data.profile.githubUrl },
    ...(data.profile.twitter
      ? [{ label: "X / Twitter", href: `https://x.com/${data.profile.twitter}` }]
      : []),
    ...(data.profile.location
      ? [{ label: data.profile.location, href: "#hero" as string }]
      : []),
  ];

  return (
    <footer ref={sectionRef} className="overflow-hidden border-t border-white/5">
      <div ref={textRef} className="whitespace-nowrap py-20 select-none">
        <span className="font-display text-[clamp(4rem,18vw,14rem)] uppercase tracking-tight text-white/5">
          SEMPRE CONSTRUINDO — SEMPRE EVOLUINDO —&nbsp;
        </span>
        <span className="font-display text-[clamp(4rem,18vw,14rem)] uppercase tracking-tight text-[#ff5c35]/20">
          SEMPRE CONSTRUINDO — SEMPRE EVOLUINDO —&nbsp;
        </span>
      </div>

      <div className="flex flex-col items-center gap-8 border-t border-white/5 px-[5vw] py-12 sm:flex-row sm:justify-between">
        <MagneticLink>
          <motion.a
            href={data.profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-2xl uppercase tracking-wider text-[#eceae6] transition hover:text-[#ff5c35]"
            whileHover={reduced ? {} : { scale: 1.02 }}
            transition={motionTheme.snap}
          >
            @{data.profile.username}
          </motion.a>
        </MagneticLink>

        <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-widest text-[#6b6560]">
          {socials.map((s) => (
            <a key={s.label} href={s.href} className="transition hover:text-[#ff5c35]" target={s.href.startsWith("http") ? "_blank" : undefined} rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}>
              {s.label}
            </a>
          ))}
        </div>

        <p className="text-xs text-[#6b6560]">
          © {new Date().getFullYear()} {data.profile.name}
        </p>
      </div>
    </footer>
  );
}
