type Props = {
  title: string;
  description: string;
  emoji?: string;
};

export default function EmptyState({
  title,
  description,
  emoji = "📭",
}: Props) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-700 p-12 text-center">
      <div className="text-6xl">
        {emoji}
      </div>

      <h2 className="mt-6 text-3xl font-black">
        {title}
      </h2>

      <p className="mt-3 text-slate-400">
        {description}
      </p>
    </div>
  );
}