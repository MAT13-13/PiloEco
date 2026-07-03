import StatsCards from "../StatsCards";

type Props = {
  analyses: number;
  economieMensuelle: number;
  economieAnnuelle: number;
};

export default function DashboardStats({
  analyses,
  economieMensuelle,
  economieAnnuelle,
}: Props) {
  return (
  <div className="mt-8">
    <StatsCards
      analyses={analyses}
      economieMensuelle={economieMensuelle}
      economieAnnuelle={economieAnnuelle}
        />
  </div>
);
}