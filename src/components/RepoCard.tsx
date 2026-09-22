import { getRepoVisual } from "../lib/repoVisuals";
import { getDemo, getScreenshot } from "../data/media";
import { useModal } from "../context/ModalContext";
import type { GitHubRepo } from "../lib/types";

function RepoThumbnail({ repo, index }: { repo: GitHubRepo; index: number }) {
  const visual = getRepoVisual(repo.name);
  const screenshot = getScreenshot(repo.name);
  const demo = getDemo(repo.name);
  const shortName = repo.name.replace(/-/g, " ").split(" ").slice(0, 2).join(" ");

  return (
    <div
      className="repo-thumb relative mb-5 aspect-[16/10] overflow-hidden border border-[var(--color-border)]"
      style={{ background: visual.gradient }}
    >
      {screenshot ? (
        <img
          src={screenshot}
          alt={`Preview de ${repo.name}`}
          className="absolute inset-0 h-full w-full object-cover object-top"
          loading="lazy"
        />
      ) : (
        <div className="repo-thumb-grid pointer-events-none absolute inset-0" aria-hidden />
      )}

      <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap gap-2 p-3">
        <span
          className="w-fit border border-[var(--color-border)] bg-white/95 px-2 py-1 font-mono text-[10px] uppercase tracking-widest shadow-sm"
          style={{ color: visual.accent }}
        >
          {visual.tag}
        </span>
        {demo && (
          <span className="w-fit border border-[var(--color-steel)]/30 bg-white/95 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--color-steel)] shadow-sm">
            Demo
          </span>
        )}
      </div>

      {!screenshot && (
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink)]/50">
            {repo.language ?? "Repo"}
          </p>
          <p className="mt-1 font-display text-xl font-bold uppercase tracking-wide text-[var(--color-ink)]">
            {shortName}
          </p>
        </div>
      )}

      <span className="pointer-events-none absolute bottom-2 right-3 font-display text-2xl font-bold text-[var(--color-ink)]/10">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

export function RepoCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const { openRepo } = useModal();
  const demo = getDemo(repo.name);

  return (
    <article className="group flex h-full min-h-[440px] w-full flex-col border border-[var(--color-border)] bg-[var(--color-surface)] transition hover:border-[var(--color-accent)]">
      <button
        type="button"
        onClick={() => openRepo(repo)}
        className="flex flex-1 flex-col text-left"
      >
        <div className="p-4 pb-0">
          <RepoThumbnail repo={repo} index={index} />
        </div>
        <div className="flex flex-1 flex-col justify-between p-4 pt-2">
          <div>
            <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[var(--color-ink)] transition group-hover:text-[var(--color-accent)]">
              {repo.name}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--color-muted)]">
              {repo.description ?? "Sem descrição"}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-3 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
            <span>{repo.language ?? "—"}</span>
            <span className="text-[var(--color-accent)] opacity-0 transition group-hover:opacity-100">
              Case →
            </span>
          </div>
        </div>
      </button>
      <div className="grid grid-cols-2 border-t border-[var(--color-border)]">
        {demo ? (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 text-center font-mono text-[10px] uppercase tracking-widest text-[var(--color-steel)] transition hover:bg-[var(--color-bg)]"
            onClick={(e) => e.stopPropagation()}
          >
            Demo
          </a>
        ) : (
          <button
            type="button"
            onClick={() => openRepo(repo)}
            className="px-4 py-3 text-center font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)] transition hover:bg-[var(--color-bg)] hover:text-[var(--color-ink)]"
          >
            Case
          </button>
        )}
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="border-l border-[var(--color-border)] px-4 py-3 text-center font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)] transition hover:bg-[var(--color-bg)] hover:text-[var(--color-ink)]"
          onClick={(e) => e.stopPropagation()}
        >
          GitHub
        </a>
      </div>
    </article>
  );
}
