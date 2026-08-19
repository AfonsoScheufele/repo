import { motion } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { motionTheme } from "../motion.theme";
import type { ReactNode } from "react";

interface MagneticLinkProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticLink({
  children,
  className = "",
  strength = 0.35,
}: MagneticLinkProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      className={`inline-block ${className}`}
      whileHover={{ scale: 1 + strength * 0.15 }}
      whileTap={{ scale: 0.97 }}
      transition={motionTheme.snap}
    >
      {children}
    </motion.span>
  );
}
