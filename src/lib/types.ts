export type RepoCategory = "industrial" | "software";

export interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  lastPush: string;
  languages: Record<string, number>;
  category: RepoCategory;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: "github" | "industrial" | "software" | "personal";
  year?: number;
  repo?: string;
}

export interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
}

export interface LanguageBreakdown {
  name: string;
  bytes: number;
  percent: number;
}

export interface ProfileReadme {
  stars: number;
  url: string;
}

export interface CaseStudy {
  challenge: string;
  stack: string[];
  outcome: string;
}

export interface RepoMedia {
  screenshot: string;
  demo?: string | null;
  caseStudy: CaseStudy;
}

export interface ProfileStats {
  publicRepos: number;
  memberSinceYear: number;
  yearsOnGitHub: number;
  languages: string[];
  totalStars: number;
  followers: number;
  following: number;
  lastPush: string | null;
}

export interface AchievementsData {
  profile: {
    name: string;
    username: string;
    avatarUrl: string;
    githubUrl: string;
    location: string | null;
    twitter: string | null;
    memberSince: string;
  };
  stats: ProfileStats;
  repos: GitHubRepo[];
  achievements: Achievement[];
  timeline: TimelineEvent[];
  languageBreakdown: LanguageBreakdown[];
  profileReadme: ProfileReadme;
  fetchedAt: string;
}
