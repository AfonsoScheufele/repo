import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getCaseStudy, getScreenshot } from "../data/media";
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
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeRepo}
            aria-label="Fechar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.article
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto border border-white/10 bg-[#0a0a0a] sm:rounded-sm"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={motionTheme.gentle}
            layout
          >
            {screenshot && (
              <div className="relative aspect-[16/10] overflow-hidden border-b border-white/5">
                <img
                  src={screenshot}
                  alt=""
                  className="h-full w-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
              </div>
            )}

            <div className="p-6 sm:p-8">
              <span
                className="text-[10px] uppercase tracking-[0.4em]"
                style={{ color: visual.accent }}
              >
                {visual.tag}
              </span>
              <h2 className="mt-2 font-display text-3xl uppercase">{selectedRepo.name}</h2>
              <p className="mt-2 text-sm text-[#8a8580]">{selectedRepo.description}</p>

              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.35em] text-[#ff5c35]">
                    Desafio
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#eceae6]">
                    {caseStudy.challenge}
                  </p>
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.35em] text-[#ff5c35]">
                    Stack
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {caseStudy.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-white/10 px-2 py-1 text-xs text-[#8a8580]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.35em] text-[#ff5c35]">
                    Resultado
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#eceae6]">
                    {caseStudy.outcome}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <a
                  href={selectedRepo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex border border-[#ff5c35] px-5 py-2.5 text-xs uppercase tracking-widest text-[#ff5c35] transition hover:bg-[#ff5c35] hover:text-[#050505]"
                >
                  Ver no GitHub
                </a>
                <button
                  type="button"
                  onClick={closeRepo}
                  className="px-5 py-2.5 text-xs uppercase tracking-widest text-[#8a8580] transition hover:text-[#eceae6]"
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
