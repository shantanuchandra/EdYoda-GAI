/* eslint-disable no-unused-vars, no-undef -- the inherited Babel parser does not apply JSX/TypeScript scope analysis. */
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import styles from "@/components/home/home-portfolio.module.css";

export const impactMetrics = [
  { value: "200 stores", label: "Hindi and English voice-guided eye test at Lenskart" },
  { value: "20 minutes", label: "Employed-customer onboarding and approval at IIFL" },
  { value: "70% less manual work", label: "Campaign operations across five commerce platforms at AGL" },
  { value: "50 → 25,000", label: "Monthly completed onboardings in six months at Builder.ai" },
] as const;

export function ImpactStrip() {
  return (
    <section aria-label="Impact highlights" className={styles.proofBand}>
      <Container>
        <Reveal>
          <div className={styles.proofInner}>
            <p className={styles.proofLabel}>Selected evidence</p>
            <ul className={styles.proofList}>
              {impactMetrics.map((metric) => (
                <li className={styles.proofItem} key={metric.value}>
                  <strong className={styles.proofValue}>{metric.value}</strong>
                  <span className={styles.proofText}>{metric.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
