export interface RepoVisual {
  gradient: string;
  accent: string;
  tag: string;
  glyph: string;
}

const DEFAULT: RepoVisual = {
  gradient: "linear-gradient(165deg, #EEF1F4 0%, #DCE3EA 55%, #C5CCD6 100%)",
  accent: "#E4572E",
  tag: "Projeto",
  glyph: "AS",
};

export const REPO_VISUALS: Record<string, RepoVisual> = {
  "Computer-Vision-Inspection-System": {
    gradient: "linear-gradient(165deg, #E8F1F8 0%, #B8D4E8 50%, #1B4965 120%)",
    accent: "#1B4965",
    tag: "Visão",
    glyph: "CV",
  },
  "digital-twin-3d": {
    gradient: "linear-gradient(165deg, #EEF0F8 0%, #C5CBE8 50%, #3D4A8A 120%)",
    accent: "#1B4965",
    tag: "Twin 3D",
    glyph: "3D",
  },
  "industrial-event-logger": {
    gradient: "linear-gradient(165deg, #F2F0EB 0%, #D9D2C5 50%, #8A8070 120%)",
    accent: "#5A6572",
    tag: "Eventos",
    glyph: "EL",
  },
  "iiot-plc-node-react-dashboard": {
    gradient: "linear-gradient(165deg, #E8F4F1 0%, #A8D5C8 50%, #1B4965 120%)",
    accent: "#1B4965",
    tag: "IIoT",
    glyph: "PLC",
  },
  rotapay: {
    gradient: "linear-gradient(165deg, #F8EFEA 0%, #F0C4B0 45%, #E4572E 130%)",
    accent: "#E4572E",
    tag: "TMS · Pix",
    glyph: "RP",
  },
  "entrega-ja": {
    gradient: "linear-gradient(165deg, #F8F0E8 0%, #E8B890 45%, #C2410C 130%)",
    accent: "#E4572E",
    tag: "Last-mile",
    glyph: "EJ",
  },
  oficinaflow: {
    gradient: "linear-gradient(165deg, #EEF2F6 0%, #C5D0DC 45%, #3D5A73 130%)",
    accent: "#1B4965",
    tag: "SaaS · OS",
    glyph: "OF",
  },
};

export function getRepoVisual(name: string): RepoVisual {
  return REPO_VISUALS[name] ?? DEFAULT;
}
