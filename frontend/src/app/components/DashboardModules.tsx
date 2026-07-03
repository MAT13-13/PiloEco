import PiloModules from "./PiloModules";
import FadeIn from "./FadeIn";

export default function DashboardModules() {
  return (
    <FadeIn delay={0.6}>
      <PiloModules />
    </FadeIn>
  );
}