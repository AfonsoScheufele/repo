import repoMedia from "./repo-media.json";
import type { CaseStudy, RepoMedia } from "../lib/types";

export const media = repoMedia as Record<string, RepoMedia>;

export function getRepoMedia(repoName: string): RepoMedia | null {
  return media[repoName] ?? null;
}

export function getCaseStudy(repoName: string): CaseStudy | null {
  return media[repoName]?.caseStudy ?? null;
}

export function getScreenshot(repoName: string): string | null {
  return media[repoName]?.screenshot ?? null;
}

export function getDemo(repoName: string): string | null {
  const demo = media[repoName]?.demo;
  return demo ?? null;
}
