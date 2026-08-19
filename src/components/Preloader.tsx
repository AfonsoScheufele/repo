import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate } from "animejs";
import { data } from "../data";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface PreloaderProps {
  onComplete: () => void;
}

function preloadImages(urls: string[]): Promise<void> {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = url;
        }),
    ),
  ).then(() => undefined);
}

export function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelTopRef = useRef<HTMLDivElement>(null);
  const panelBottomRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const reduced = useReducedMotion();
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;

    if (reduced) {
      setHidden(true);
      document.body.style.overflow = "";
      onComplete();
      ScrollTrigger.refresh();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setHidden(true);
        document.body.style.overflow = "";
        onComplete();
        ScrollTrigger.refresh();
      },
    });

    tl.to(labelRef.current, { opacity: 0, y: -20, duration: 0.25 }, 0)
      .to(progressRef.current, { opacity: 0, scale: 1.2, duration: 0.25 }, 0)
      .to(barRef.current, { scaleX: 0, transformOrigin: "right center", duration: 0.3 }, 0)
      .to(
        panelTopRef.current,
        { yPercent: -100, duration: 0.9, ease: "power4.inOut" },
        0.15,
      )
      .to(
        panelBottomRef.current,
        { yPercent: 100, duration: 0.9, ease: "power4.inOut" },
        0.15,
      );
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const assets = [data.profile.avatarUrl];

    if (reduced) {
      finish();
      return () => {
        document.body.style.overflow = "";
      };
    }

    let cancelled = false;

    preloadImages(assets).then(() => {
      if (cancelled) return;

      const obj = { p: 0 };
      animate(obj, {
        p: 100,
        duration: 2200,
        ease: "inOutQuad",
        onUpdate: () => {
          if (progressRef.current) {
            progressRef.current.textContent = String(Math.round(obj.p)).padStart(3, "0");
          }
          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${obj.p / 100})`;
          }
        },
        onComplete: () => {
          if (!cancelled) gsap.delayedCall(0.3, finish);
        },
      });
    });

    return () => {
      cancelled = true;
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  if (hidden) return null;

  return (
    <div
      ref={overlayRef}
      className="preloader fixed inset-0 z-[200] flex cursor-pointer flex-col items-center justify-center"
      onClick={() => finish()}
      role="presentation"
    >
      <div
        ref={panelTopRef}
        className="preloader-panel absolute inset-x-0 top-0 h-1/2 bg-[#050505]"
      />
      <div
        ref={panelBottomRef}
        className="preloader-panel absolute inset-x-0 bottom-0 h-1/2 bg-[#050505]"
      />

      <div className="relative z-10 flex flex-col items-center gap-6 pointer-events-none">
        <span
          ref={progressRef}
          className="font-display text-[clamp(4rem,15vw,10rem)] leading-none text-[#eceae6]"
        >
          000
        </span>
        <div ref={labelRef} className="text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#8a8580]">
            Carregando
          </p>
          <p className="mt-2 font-display text-3xl uppercase tracking-[0.2em] text-[#ff5c35]">
            Scheufele
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-white/10">
        <div
          ref={barRef}
          className="h-full origin-left bg-[#ff5c35]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <p className="absolute bottom-8 z-10 text-[10px] uppercase tracking-[0.35em] text-[#8a8580] pointer-events-none">
        Clique para pular
      </p>
    </div>
  );
}
