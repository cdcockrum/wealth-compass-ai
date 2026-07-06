interface ScoreCardProps {
  title: string;
  score: number;
  rating: string;
  strengths: string[];
  concerns: string[];
}

export function ScoreCard({
  title,
  score,
  rating,
  strengths,
  concerns,
}: ScoreCardProps) {
  return (
    <section className="rounded-xl border border-border/60 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{rating}</p>
        </div>

        <div className="text-4xl font-bold">{score}</div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="mb-3 font-medium text-emerald-500">
            Strengths
          </h4>

          <ul className="space-y-2 text-sm text-muted-foreground">
            {strengths.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-medium text-amber-500">
            Concerns
          </h4>

          <ul className="space-y-2 text-sm text-muted-foreground">
            {concerns.length ? (
              concerns.map((item) => (
                <li key={item}>• {item}</li>
              ))
            ) : (
              <li>No major concerns detected.</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}