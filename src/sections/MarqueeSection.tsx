import TextLoop from "../components/TextLoop";
import { data } from "../data";

const TAGS = [
  ...data.stats.languages,
  "IIoT",
  "OPC-UA",
  "Event Sourcing",
  "Digital Twin",
  "TensorFlow",
  "Three.js",
  "React",
  "Node.js",
];

export function MarqueeSection() {
  const text = TAGS.filter(Boolean).join(" · ");

  return (
    <section className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden">
      <TextLoop
        text={text}
        shape="line"
        path="M -400 90 L 1600 90"
        viewBox="0 0 1200 180"
        speed={90}
        direction="forward"
        separator="·"
        curviness={0}
        fontSize={72}
        fontWeight={400}
        letterSpacing={4}
        uppercase
        color="#eceae6"
        ribbon
        ribbonColor="#ff5c35"
        ribbonWidth={120}
        pauseOnHover
        className="font-display text-loop--marquee"
      />
    </section>
  );
}
