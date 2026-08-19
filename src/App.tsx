import { lazy, Suspense, useEffect, useState } from "react";
import { Preloader } from "./components/Preloader";
import { ScrollProgress } from "./components/ScrollProgress";
import { CaseStudyModal } from "./components/CaseStudyModal";
import { ModalProvider } from "./context/ModalContext";
import { HeroSection } from "./sections/HeroSection";
import { MarqueeSection } from "./sections/MarqueeSection";
import { ManifestoSection } from "./sections/ManifestoSection";
import { TrackSection } from "./sections/TrackSection";
import { JourneyTimeline } from "./sections/JourneyTimeline";
import { ProfileHighlight } from "./sections/ProfileHighlight";
import { StatsPinned } from "./sections/StatsPinned";
import { LanguageChart } from "./sections/LanguageChart";
import { ReposHorizontal } from "./sections/ReposHorizontal";
import { AchievementsGrid } from "./sections/AchievementsGrid";
import { FooterSection } from "./sections/FooterSection";
import { MagneticLink } from "./components/MagneticLink";
import { useLenis } from "./hooks/useLenis";
import { data } from "./data";
import { motion, AnimatePresence } from "motion/react";

const CustomCursor = lazy(() =>
  import("./components/CustomCursor").then((m) => ({ default: m.CustomCursor })),
);

function Nav({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#track", label: "Tracks" },
    { href: "#timeline", label: "Timeline" },
    { href: "#repos", label: "Repos" },
    { href: "#conquistas", label: "Conquistas" },
    { href: data.profile.githubUrl, label: "GitHub", external: true },
  ];

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } ${scrolled ? "border-b border-white/5 bg-[#050505]/90 backdrop-blur-md" : "bg-transparent"}`}
    >
      <div className="flex items-center justify-between px-[5vw] py-5">
        <MagneticLink>
          <a href="#hero" className="font-display text-xl uppercase tracking-widest text-[#eceae6]">
            AS
          </a>
        </MagneticLink>

        <div className="hidden gap-8 text-[10px] uppercase tracking-[0.35em] text-[#6b6560] md:flex">
          {links.map((l) => (
            <MagneticLink key={l.label}>
              <a
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="transition hover:text-[#ff5c35]"
              >
                {l.label}
              </a>
            </MagneticLink>
          ))}
        </div>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block h-px w-6 bg-[#eceae6] transition ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-[#eceae6] transition ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-[#eceae6] transition ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/5 bg-[#050505] md:hidden"
          >
            <div className="flex flex-col gap-4 px-[5vw] py-6">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noopener noreferrer" : undefined}
                  className="text-sm uppercase tracking-widest text-[#8a8580]"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  useLenis(ready);

  return (
    <ModalProvider>
      <Preloader onComplete={() => setReady(true)} />
      <ScrollProgress />
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>
      <Nav visible={ready} />
      <main>
        <HeroSection ready={ready} />
        <MarqueeSection />
        <ManifestoSection />
        <TrackSection />
        <JourneyTimeline />
        <ProfileHighlight />
        <StatsPinned />
        <LanguageChart />
        <ReposHorizontal />
        <AchievementsGrid />
      </main>
      <FooterSection />
      <CaseStudyModal />
    </ModalProvider>
  );
}
