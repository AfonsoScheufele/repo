import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getCaseStudy, getDemo, getScreenshot } from "../data/media";
import { getRepoVisual } from "../lib/repoVisuals";
import { useModal } from "../context/ModalContext";
import { motionTheme } from "../motion.theme";

export function CaseStudyModal() {
  const { selectedRepo, closeRepo } = useModal();

  useEffect(() => {
    if (!selectedRepo) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeRepo();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedRepo, closeRepo]);

  const caseStudy = selectedRepo ? getCaseStudy(selectedRepo.name) : null;
  const screenshot = selectedRepo ? getScreenshot(selectedRepo.name) : null;
  const demo = selectedRepo ? getDemo(selectedRepo.name) : null;
  const visual = selectedRepo ? getRepoVisual(selectedRepo.name) : null;

  return (
    <AnimatePresence>
      {selectedRepo && caseStudy && visual && (
        <motion.div
          className="fixed inset-0 z-[250] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={motionTheme.ui}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-[var(--color-ink)]/50 backdrop-blur-sm"
            onClick={closeRepo}
            aria-label="Fechar"
          />

          <motion.article
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto border border-[var(--color-border)] bg-[var(--color-surface)] sm:rounded-sm"
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 32, opacity: 0 }}
            transition={motionTheme.gentle}
          >
            {screenshot && (
              <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--color-border)]">
                <img src={screenshot} alt="" className="h-full w-full object-cover" />
              </div>
            )}

            <div className="p-6 sm:p-8">
              <span
                className="font-mono text-[10px] uppercase tracking-[0.28em]"
                style={{ color: visual.accent }}
              >
                {visual.tag}
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase text-[var(--color-ink)]">
                {selectedRepo.name}
              </h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{selectedRepo.description}</p>

              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
                    Problema
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink)]">
                    {caseStudy.challenge}
                  </p>
                </div>
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
                    Stack
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {caseStudy.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-[var(--color-border)] px-2 py-1 font-mono text-xs text-[var(--color-steel)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
                    O que ficou
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink)]">
                    {caseStudy.outcome}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {demo && (
                  <a
                    href={demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[var(--color-steel)] px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-[var(--color-steel)] transition hover:bg-[var(--color-steel)] hover:text-white"
                  >
                    Demo
                  </a>
                )}
                <a
                  href={selectedRepo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--color-accent)] px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-white transition hover:bg-[var(--color-steel)]"
                >
                  GitHub
                </a>
                <button
                  type="button"
                  onClick={closeRepo}
                  className="px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
                >
                  Fechar
                </button>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
