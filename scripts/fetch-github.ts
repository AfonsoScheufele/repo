import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type {
  Achievement,
  AchievementsData,
  GitHubRepo,
  TimelineEvent,
} from "../src/lib/types.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const USERNAME = process.env.GITHUB_USERNAME ?? "devA52";
const DISPLAY_NAME = process.env.DISPLAY_NAME ?? "Afonso Scheufele";

interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  created_at: string;
  public_repos: number;
}

interface GitHubRepoRaw {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  topics: string[];
  updated_at: string;
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error ${response.status} for ${url}`);
  }

  return response.json() as Promise<T>;
}

function loadManualAchievements(): Achievement[] {
  const path = join(__dirname, "../src/data/manual-achievements.json");
  return JSON.parse(readFileSync(path, "utf-8")) as Achievement[];
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
      title: "Entrada no GitHub",
      description: `Conta @${USERNAME} criada — início da jornada open source.`,
    },
  ];

  for (const repo of repos) {
    const year = new Date(repo.updatedAt).getFullYear();
    events.push({
      id: `repo-${repo.name}`,
      year,
      title: repo.name,
      description: repo.description ?? "Repositório público no GitHub.",
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

async function main() {
  const manualAchievements = loadManualAchievements();

  let user: GitHubUser;
  let reposRaw: GitHubRepoRaw[];

  try {
    [user, reposRaw] = await Promise.all([
      fetchJson<GitHubUser>(`https://api.github.com/users/${USERNAME}`),
      fetchJson<GitHubRepoRaw[]>(
        `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
      ),
    ]);
  } catch (error) {
    console.warn("GitHub API unavailable, using fallback data:", error);
    user = {
      login: USERNAME,
      avatar_url: `https://avatars.githubusercontent.com/u/57766228?v=4`,
      html_url: `https://github.com/${USERNAME}`,
      created_at: "2019-11-14T16:32:09Z",
      public_repos: 2,
    };
    reposRaw = [
      {
        name: "KiCad1",
        description: "TestKiCad1",
        language: null,
        stargazers_count: 0,
        html_url: `https://github.com/${USERNAME}/KiCad1`,
        topics: [],
        updated_at: "2019-11-18T10:00:00Z",
      },
      {
        name: "tram3",
        description: "Strassenbahn",
        language: null,
        stargazers_count: 0,
        html_url: `https://github.com/${USERNAME}/tram3`,
        topics: [],
        updated_at: "2019-11-18T10:00:00Z",
      },
    ];
  }

  const memberSinceYear = new Date(user.created_at).getFullYear();
  const currentYear = new Date().getFullYear();

  const repos: GitHubRepo[] = reposRaw.map((repo) => ({
    name: repo.name,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    url: repo.html_url,
    topics: repo.topics,
    updatedAt: repo.updated_at,
  }));

  const languages = [
    ...new Set(repos.map((r) => r.language).filter(Boolean)),
  ] as string[];

  const githubAchievements: Achievement[] = [
    {
      id: "gh-member",
      title: `Membro GitHub desde ${memberSinceYear}`,
      description: `${currentYear - memberSinceYear}+ anos construindo e compartilhando código.`,
      category: "github",
      year: memberSinceYear,
      icon: "github",
    },
    {
      id: "gh-repos",
      title: `${user.public_repos} Repositórios Públicos`,
      description: "Projetos open source disponíveis para a comunidade.",
      category: "github",
      icon: "folder",
    },
  ];

  if (languages.length > 0) {
    githubAchievements.push({
      id: "gh-langs",
      title: `${languages.length} Linguagens`,
      description: languages.join(", "),
      category: "github",
      icon: "code",
    });
  }

  const data: AchievementsData = {
    profile: {
      name: DISPLAY_NAME,
      username: user.login,
      avatarUrl: user.avatar_url,
      githubUrl: user.html_url,
      memberSince: user.created_at,
    },
    stats: {
      publicRepos: user.public_repos,
      memberSinceYear,
      yearsOnGitHub: currentYear - memberSinceYear,
      languages,
      totalStars: repos.reduce((sum, r) => sum + r.stars, 0),
    },
    repos,
    achievements: [...githubAchievements, ...manualAchievements],
    timeline: buildTimeline(memberSinceYear, repos, manualAchievements),
    fetchedAt: new Date().toISOString(),
  };

  const outPath = join(__dirname, "../src/data/achievements.json");
  writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log(`✓ achievements.json gerado (${data.achievements.length} conquistas)`);
}

main();
