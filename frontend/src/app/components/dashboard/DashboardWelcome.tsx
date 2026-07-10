import PiloNestHero from "../PiloNestHero";

type Props = {
  name: string;
  economieAnnuelle: number;
  piloTitle?: string;
  piloMessage?: string;
};

export default function DashboardWelcome({
  name,
  economieAnnuelle,
  piloTitle,
  piloMessage,
}: Props) {
  return (
    <PiloNestHero
      name={name}
      economieAnnuelle={economieAnnuelle}
      piloTitle={piloTitle}
piloMessage={piloMessage}
    />
  );
}
