import { Section } from '../section';

export type TWakatimeStatsCard = {
  title: string;
  value: string;
  description: string;
  delay: number;
};

export function WakatimeStatsCard({
  title,
  value,
  description,
  delay,
}: TWakatimeStatsCard) {
  return (
    <Section delay={delay}>
      <div className="flex flex-col space-y-2 rounded-lg border bg-card p-4 shadow-sm">
        <h3 className="font-medium text-foreground text-sm">{title}</h3>
        <p className="font-semibold text-2xl text-foreground">{value}</p>
        <p className="text-foreground-lighter text-sm">{description}</p>
      </div>
    </Section>
  );
}
