type Props = {
  title: string;
  message: string;
};

export default function PiloAdvice({ title, message }: Props) {
  return (
    <div className="mt-10 rounded-[2rem] border border-green-500/20 bg-green-500/10 p-6">
      <div className="flex items-start gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-4xl">
          🐦
        </div>

        <div className="flex-1">
          <p className="text-sm font-bold uppercase tracking-widest text-green-400">
            {title}
          </p>

          <p className="mt-3 text-lg leading-8 text-slate-200">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}