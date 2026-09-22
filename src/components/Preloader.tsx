import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const reduced = useReducedMotion();
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;

    if (reduced || !overlayRef.current) {
      setHidden(true);
      document.body.style.overflow = "";
      onComplete();
      ScrollTrigger.refresh();
      return;
    }

    gsap.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.55,
      ease: "power3.inOut",
      onComplete: () => {
        setHidden(true);
        document.body.style.overflow = "";
        onComplete();
        ScrollTrigger.refresh();
      },
    });
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(finish, reduced ? 0 : 700);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  if (hidden) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex cursor-pointer flex-col items-center justify-center bg-[var(--color-bg)]"
      onClick={() => finish()}
      role="presentation"
    >
      <p className="font-display text-4xl font-extrabold uppercase tracking-tight text-[var(--color-ink)] md:text-6xl">
        Scheufele
      </p>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--color-muted)]">
        Carregando · clique pra pular
      </p>
    </div>
  );
}
