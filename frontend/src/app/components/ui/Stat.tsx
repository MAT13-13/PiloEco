type Props = {
  title: string;
  value: string | number;
  icon: string;
};

export default function Stat({
  title,
  value,
  icon,
}: Props) {
  return (
    <div className="rounded-2xl border border-green-500/20 bg-white/5 p-5">
      <p className="text-sm uppercase tracking-widest text-green-400">
        {icon} {title}
      </p>

      <p className="mt-3 text-4xl font-black">
        {value}
      </p>
    </div>
  );
}