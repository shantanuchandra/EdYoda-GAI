/* eslint-disable no-undef -- the inherited Babel parser does not apply TypeScript scope analysis. */
type ImpactMetricProps = {
  label: string;
  value: string;
};

export function ImpactMetric({ label, value }: ImpactMetricProps) {
  return (
    <li className="grid content-start gap-2 border-b border-line py-7 last:border-b-0 md:border-r md:px-7 md:nth-[2n]:border-r-0 md:nth-last-[-n+2]:border-b-0 lg:border-r lg:border-b-0 lg:px-[clamp(20px,2.4vw,34px)] lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0 lg:nth-[2n]:border-r">
      <strong className="font-display text-[clamp(1.8rem,3vw,2.5rem)] leading-none font-semibold tracking-[-0.025em] text-teal-dark">
        {value}
      </strong>
      <span className="max-w-[29ch] text-[0.83rem] leading-[1.45] text-muted-ink">{label}</span>
    </li>
  );
}
