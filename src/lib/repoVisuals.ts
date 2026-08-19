export interface RepoVisual {
  gradient: string;
  accent: string;
  tag: string;
  glyph: string;
}

const DEFAULT: RepoVisual = {
  gradient: "linear-gradient(165deg, #050505 0%, #141414 55%, #3d1a0f 100%)",
  accent: "#ff5c35",
  tag: "Open Source",
  glyph: "OS",
};

export const REPO_VISUALS: Record<string, RepoVisual> = {
  "money-manager": {
    gradient: "linear-gradient(165deg, #050505 0%, #1a1408 45%, #92400e 100%)",
    accent: "#d97706",
    tag: "Finance",
    glyph: "MM",
  },
  "Computer-Vision-Inspection-System": {
    gradient: "linear-gradient(165deg, #050505 0%, #0a1628 50%, #1e3a5f 100%)",
    accent: "#38bdf8",
    tag: "Computer Vision",
    glyph: "CV",
  },
  "digital-twin-3d": {
    gradient: "linear-gradient(165deg, #050505 0%, #120f2e 48%, #4338ca 100%)",
    accent: "#818cf8",
    tag: "Digital Twin",
    glyph: "3D",
  },
  "industrial-event-logger": {
    gradient: "linear-gradient(165deg, #050505 0%, #141210 50%, #44403c 100%)",
    accent: "#c9a962",
    tag: "Event Sourcing",
    glyph: "EL",
  },
  "iiot-plc-node-react-dashboard": {
    gradient: "linear-gradient(165deg, #050505 0%, #042f2e 45%, #115e59 100%)",
    accent: "#2dd4bf",
    tag: "IIoT",
    glyph: "IIoT",
  },
};

export function getRepoVisual(name: string): RepoVisual {
  return REPO_VISUALS[name] ?? DEFAULT;
}
