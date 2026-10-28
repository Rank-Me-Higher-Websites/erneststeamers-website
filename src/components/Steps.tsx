export type StepItem = {
  title: string;
  body: string;
};

const columnClass = {
  3: "md:grid-cols-3",
  4: "sm:grid-cols-2 xl:grid-cols-4",
} as const;

export default function Steps({ steps, columns = 3 }: { steps: StepItem[]; columns?: 3 | 4 }) {
  return (
    <ol className={`grid gap-6 ${columnClass[columns]}`}>
      {steps.map((step, index) => (
        <li key={step.title} className="rounded-2xl border border-border bg-white p-5">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(174,42%,94%)] font-heading text-xl font-bold text-[hsl(174,62%,22%)]">
            {index + 1}
          </span>
          <h3 className="mt-4 font-heading text-xl font-bold text-primary">{step.title}</h3>
          <p className="mt-2 text-base leading-relaxed text-[hsl(216,30%,26%)]">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
