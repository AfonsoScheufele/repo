export interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  url: string;
  topics: string[];
  updatedAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: "github" | "career" | "tech" | "personal";
  year?: number;
  icon?: string;
}

export interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
}

export interface ProfileStats {
  publicRepos: number;
  memberSinceYear: number;
  yearsOnGitHub: number;
  languages: string[];
  totalStars: number;
}

export interface AchievementsData {
  profile: {
    name: string;
    username: string;
    avatarUrl: string;
    githubUrl: string;
    memberSince: string;
  };
  stats: ProfileStats;
  repos: GitHubRepo[];
  achievements: Achievement[];
  timeline: TimelineEvent[];
  fetchedAt: string;
}
