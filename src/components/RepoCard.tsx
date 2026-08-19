import { getRepoVisual } from "../lib/repoVisuals";
import { getScreenshot } from "../data/media";
import { useModal } from "../context/ModalContext";
import type { GitHubRepo } from "../lib/types";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  HTML: "#e34c26",
};

function RepoThumbnail({ repo, index }: { repo: GitHubRepo; index: number }) {
  const visual = getRepoVisual(repo.name);
  const screenshot = getScreenshot(repo.name);
  const shortName = repo.name.replace(/-/g, " ").split(" ").slice(0, 2).join(" ");

  return (
    <div
      className="repo-thumb relative mb-6 aspect-[16/10] overflow-hidden rounded-sm border border-white/6"
      style={{ background: visual.gradient }}
    >
      {screenshot && (
        <>
          <img
            src={screenshot}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-90 brightness-[0.55] saturate-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#050505]/40" />
        </>
      )}

      {!screenshot && (
        <>
          <div className="repo-thumb-grid pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden />
          <span
            className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 select-none font-display text-[clamp(5rem,14vw,8rem)] uppercase leading-none text-white/[0.04]"
            aria-hidden
          >
            {visual.glyph}
          </span>
        </>
      )}

      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <span
          className="w-fit rounded-sm border border-white/10 bg-black/50 px-2.5 py-1 text-[10px] uppercase tracking-widest backdrop-blur-sm"
          style={{ color: visual.accent }}
        >
          {visual.tag}
        </span>
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            {repo.language ?? "Repo"}
          </p>
          <p className="mt-1 font-display text-2xl uppercase tracking-wide text-white/90">
            {shortName}
          </p>
        </div>
      </div>

      <span className="absolute bottom-4 right-4 font-display text-4xl text-white/10">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

export function RepoCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const { openRepo } = useModal();
  const visual = getRepoVisual(repo.name);

  return (
    <article className="repo-card-h group relative flex min-h-[520px] flex-col overflow-hidden rounded-sm border border-white/8 bg-[#0a0a0a] transition-colors hover:border-white/15">
      <button
        type="button"
        onClick={() => openRepo(repo)}
        className="flex flex-1 flex-col text-left"
      >
        <div className="p-5 pb-0">
          <RepoThumbnail repo={repo} index={index} />
        </div>
        <div className="flex flex-1 flex-col justify-between p-5 pt-3">
          <div>
            <h3 className="font-display text-2xl uppercase tracking-wide text-[#eceae6] transition-colors group-hover:text-[#ff5c35]">
              {repo.name}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#6b6560]">
              {repo.description ?? "Sem descrição"}
            </p>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 text-[10px] uppercase tracking-widest text-[#6b6560]">
            {repo.language && (
              <span className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: LANG_COLORS[repo.language] ?? visual.accent }}
                />
                {repo.language}
              </span>
            )}
            <span>★ {repo.stars}</span>
            <span className="text-[#ff5c35] opacity-0 transition-opacity group-hover:opacity-100">
              Case study →
            </span>
          </div>
        </div>
      </button>
      <a
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="border-t border-white/5 px-5 py-3 text-center text-[10px] uppercase tracking-widest text-[#6b6560] transition hover:bg-white/5 hover:text-[#eceae6]"
        onClick={(e) => e.stopPropagation()}
      >
        Ver no GitHub
      </a>
    </article>
  );
}
