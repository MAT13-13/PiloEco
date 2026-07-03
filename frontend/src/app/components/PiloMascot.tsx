"use client";

import Image from "next/image";

type Props = {
  message?: string;
  size?: "small" | "medium" | "large";
};

export default function PiloMascot({
  message = "Je veille sur ton portefeuille.",
  size = "medium",
}: Props) {
  const dimensions = {
    small: 80,
    medium: 140,
    large: 260,
  };

  const imageSize = dimensions[size];

  return (
    <div className="flex items-end gap-4">

      <div className="max-w-sm rounded-3xl rounded-br-none border border-green-500/20 bg-slate-900 p-5 shadow-2xl">
        <p className="text-slate-200">
          {message}
        </p>
      </div>

      <div className="relative">

        <div className="absolute inset-0 scale-110 rounded-full bg-green-500/20 blur-3xl" />

        <Image
          src="/images/pilo.png"
          alt="Pilo"
          width={imageSize}
          height={imageSize}
          priority
          className="relative animate-float drop-shadow-[0_25px_60px_rgba(34,197,94,.45)]"
        />

      </div>

    </div>
  );
}