type Props = {
  value: number;
};

export default function Progress({
  value,
}: Props) {
  return (
    <div className="h-3 overflow-hidden rounded-full bg-slate-800">
      <div
        className="h-full rounded-full bg-green-500 transition-all duration-500"
        style={{
          width: `${value}%`,
        }}
      />
    </div>
  );
}