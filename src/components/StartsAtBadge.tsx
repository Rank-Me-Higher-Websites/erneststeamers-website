export default function StartsAtBadge({ className = "" }: { className?: string }) {
  return (
    <p
      className={`inline-flex min-h-12 items-center self-start rounded-full bg-[hsl(174,40%,94%)] px-4 text-base font-bold text-[hsl(174,62%,22%)] ${className}`}
    >
      Starts at $99
    </p>
  );
}
