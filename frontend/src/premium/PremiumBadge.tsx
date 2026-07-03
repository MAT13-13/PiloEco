type Props = {
  small?: boolean;
};

export default function PremiumBadge({ small = false }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-yellow-500/20 font-bold text-yellow-300 ${
        small ? "px-3 py-1 text-xs" : "px-4 py-2 text-sm"
      }`}
    >
      ⭐ Premium
    </span>
  );
}