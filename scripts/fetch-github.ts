import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type {
  Achievement,
  AchievementsData,
  GitHubRepo,
  LanguageBreakdown,
  RepoCategory,
  TimelineEvent,
} from "../src/lib/types.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const USERNAME = process.env.GITHUB_USERNAME ?? "AfonsoScheufele";

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  created_at: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  twitter_username: string | null;
}

interface GitHubRepoRaw {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!response.ok) throw new Error(`GitHub API ${response.status}: ${url}`);
  return response.json() as Promise<T>;
}

function loadManualAchievements(): Achievement[] {
  const path = join(__dirname, "../src/data/manual-achievements.json");
  return JSON.parse(readFileSync(path, "utf-8")) as Achievement[];
}

function inferCategory(name: string): RepoCategory {
  const industrial =
    name.startsWith("iiot-") ||
    name.startsWith("industrial-") ||
    name.includes("Computer-Vision") ||
    name.includes("Inspection");
  return industrial ? "industrial" : "software";
}

function buildLanguageBreakdown(repos: GitHubRepo[]): LanguageBreakdown[] {
  const totals: Record<string, number> = {};
  for (const repo of repos) {
    for (const [lang, bytes] of Object.entries(repo.languages)) {
      totals[lang] = (totals[lang] ?? 0) + bytes;
    }
  }
  const sum = Object.values(totals).reduce((a, b) => a + b, 0);
  if (sum === 0) return [];

  return Object.entries(totals)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percent: Math.round((bytes / sum) * 100),
    }))
    .sort((a, b) => b.bytes - a.bytes);
}

function buildTimeline(
  memberSinceYear: number,
  repos: GitHubRepo[],
  manual: Achievement[],
): TimelineEvent[] {
  const events: TimelineEvent[] = [
    {
      id: "github-join",
      year: memberSinceYear,
      title: "GitHub",
      description: `@${USERNAME} — início da jornada open source.`,
    },
  ];

  for (const repo of repos) {
    events.push({
      id: `repo-${repo.name}`,
      year: new Date(repo.createdAt).getFullYear(),
      title: repo.name,
      description: repo.description ?? "Repositório público.",
    });
  }

  for (const item of manual.filter((a) => a.year)) {
    events.push({
      id: item.id,
      year: item.year!,
      title: item.title,
      description: item.description,
    });
  }

  return events.sort((a, b) => a.year - b.year);
}

async function fetchRepoLanguages(name: string): Promise<Record<string, number>> {
  try {
    await sleep(100);
    return await fetchJson<Record<string, number>>(
      `https://api.github.com/repos/${USERNAME}/${name}/languages`,
    );
  } catch {
    return {};
  }
}

async function main() {
  const manualAchievements = loadManualAchievements();

  const [user, reposRaw] = await Promise.all([
    fetchJson<GitHubUser>(`https://api.github.com/users/${USERNAME}`),
    fetchJson<GitHubRepoRaw[]>(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=created&direction=desc`,
    ),
  ]);

  const profileRepo = reposRaw.find((r) => r.name === USERNAME);
  const projectRepos = reposRaw.filter((r) => r.name !== USERNAME);

  const repos: GitHubRepo[] = [];
  for (const repo of projectRepos) {
    const languages = await fetchRepoLanguages(repo.name);
    repos.push({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url,
      topics: repo.topics,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      lastPush: repo.pushed_at,
      languages,
      category: inferCategory(repo.name),
    });
  }

  const memberSinceYear = new Date(user.created_at).getFullYear();
  const currentYear = new Date().getFullYear();
  const languages = [...new Set(repos.map((r) => r.language).filter(Boolean))] as string[];

  const lastPush = repos.reduce<string | null>((latest, repo) => {
    if (!latest || repo.lastPush > latest) return repo.lastPush;
    return latest;
  }, null);

  const githubAchievements: Achievement[] = [
    {
      id: "gh-followers",
      title: `${user.followers} Seguidores`,
      description: "Comunidade dev acompanhando o trabalho no GitHub.",
      category: "github",
    },
    {
      id: "gh-repos",
      title: `${repos.length} Projetos Públicos`,
      description: "De IIoT e visão computacional a dashboards e ERP.",
      category: "github",
    },
    {
      id: "gh-profile",
      title: "Profile README",
      description: `${profileRepo?.stargazers_count ?? 0} stars no repositório de perfil.`,
      category: "github",
      repo: USERNAME,
    },
  ];

  if (languages.length > 0) {
    githubAchievements.push({
      id: "gh-langs",
      title: languages.join(" · "),
      description: "Stack técnica nos repositórios públicos.",
      category: "github",
    });
  }

  const data: AchievementsData = {
    profile: {
      name: user.name ?? "Afonso Scheufele",
      username: user.login,
      avatarUrl: user.avatar_url,
      githubUrl: user.html_url,
      location: user.location,
      twitter: user.twitter_username,
      memberSince: user.created_at,
    },
    stats: {
      publicRepos: repos.length,
      memberSinceYear,
      yearsOnGitHub: Math.max(1, currentYear - memberSinceYear),
      languages,
      totalStars: reposRaw.reduce((s, r) => s + r.stargazers_count, 0),
      followers: user.followers,
      following: user.following,
      lastPush,
    },
    repos,
    achievements: [...githubAchievements, ...manualAchievements],
    timeline: buildTimeline(memberSinceYear, repos, manualAchievements),
    languageBreakdown: buildLanguageBreakdown(repos),
    profileReadme: {
      stars: profileRepo?.stargazers_count ?? 0,
      url: `https://github.com/${USERNAME}/${USERNAME}`,
    },
    fetchedAt: new Date().toISOString(),
  };

  const outPath = join(__dirname, "../src/data/achievements.json");
  writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log(
    `✓ ${data.repos.length} repos · ${data.languageBreakdown.length} langs · @${USERNAME}`,
  );
}

main();
