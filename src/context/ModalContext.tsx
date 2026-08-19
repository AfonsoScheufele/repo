import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { GitHubRepo } from "../lib/types";

interface ModalContextValue {
  selectedRepo: GitHubRepo | null;
  openRepo: (repo: GitHubRepo) => void;
  closeRepo: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);

  const openRepo = useCallback((repo: GitHubRepo) => setSelectedRepo(repo), []);
  const closeRepo = useCallback(() => setSelectedRepo(null), []);

  return (
    <ModalContext.Provider value={{ selectedRepo, openRepo, closeRepo }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
