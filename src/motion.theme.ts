export const motionTheme = {
  snap: { type: "spring" as const, stiffness: 500, damping: 30 },
  ui: { type: "spring" as const, stiffness: 300, damping: 28 },
  gentle: { type: "spring" as const, stiffness: 120, damping: 20 },
  lively: { type: "spring" as const, stiffness: 400, damping: 15 },
  ambient: { duration: 8, repeat: Infinity, ease: "easeInOut" as const },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};
