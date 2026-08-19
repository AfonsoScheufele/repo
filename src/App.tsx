import { HeroSection } from "./sections/HeroSection";
import { StatsBento } from "./sections/StatsBento";
import { JourneyTimeline } from "./sections/JourneyTimeline";
import { ReposGrid } from "./sections/ReposGrid";
import { FooterSection } from "./sections/FooterSection";

export default function App() {
  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-display text-lg font-bold gradient-text">Conquistas</span>
          <div className="flex gap-6 text-sm text-zinc-400">
            <a href="#conquistas" className="transition hover:text-white">
              Conquistas
            </a>
            <a href="#jornada" className="transition hover:text-white">
              Jornada
            </a>
            <a href="#repos" className="transition hover:text-white">
              Repos
            </a>
          </div>
        </div>
      </nav>

      <main>
        <HeroSection />
        <StatsBento />
        <JourneyTimeline />
        <ReposGrid />
      </main>

      <FooterSection />
    </>
  );
}
