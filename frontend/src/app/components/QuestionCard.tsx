type Props = {
  title: string;
  children: React.ReactNode;
};

export default function QuestionCard({ title, children }: Props) {
  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl border border-green-500/20 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
      <h2 className="mb-8 text-center text-3xl font-black text-white">
        {title}
      </h2>

      {children}
    </div>
  );
}