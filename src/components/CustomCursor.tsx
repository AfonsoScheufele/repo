import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function CustomCursor() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [finePointer, setFinePointer] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFinePointer(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setFinePointer(e.matches);
    mq.addEventListener("change", onChange);

    if (!mq.matches || reduced) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);

    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
    };
  }, [cursorX, cursorY, reduced, visible]);

  if (reduced || !finePointer) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[300] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff5c35] mix-blend-difference"
        style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[299] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ff5c35]/40"
        style={{ x: springX, y: springY, opacity: visible ? 0.6 : 0 }}
      />
    </>
  );
}
