/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import { Container } from "@/components/ui/container";
import styles from "@/components/home/home-portfolio.module.css";

const stages = [
  {
    number: "01",
    title: "Signal",
    description: "Find the valuable problem before committing the technology.",
    items: [
      "AI product strategy and portfolio prioritization",
      "workflow and operating-model redesign",
    ],
  },
  {
    number: "02",
    title: "System",
    description: "Design the product, evaluation loop and human controls together.",
    items: [
      "product discovery and adoption",
      "RAG, agentic systems and evaluation design",
      "human review and responsible deployment",
    ],
  },
  {
    number: "03",
    title: "Scale",
    description: "Turn a working product into a measurable operating capability.",
    items: [
      "cross-functional product and engineering leadership",
      "measurement, iteration and scale",
    ],
  },
] as const;

export function Capabilities() {
  return (
    <section className={`${styles.section} ${styles.sectionTint}`}>
      <Container>
        <div className={styles.sectionTop}>
          <div>
            <p className={styles.eyebrow}>How I lead</p>
            <h2 className={styles.sectionTitle}>Transformation is an operating system.</h2>
          </div>
          <p className={styles.sectionDescription}>The model is only one component. I connect strategic choice, workflow design, responsible controls and adoption into one product system.</p>
        </div>
        <div className={styles.systemGrid}>
          {stages.map((stage) => (
            <article className={styles.systemStage} key={stage.title}>
              <span className={styles.stageNumber}>{stage.number} / 03</span>
              <h3 className={styles.stageTitle}>{stage.title}</h3>
              <p className={styles.stageDescription}>{stage.description}</p>
              <ul className={styles.stageList}>
                {stage.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
