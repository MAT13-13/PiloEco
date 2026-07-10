import { PiloNotification } from "../services/pilo-engine/notifications";

type Props = {
  notifications: PiloNotification[];
};

export default function PiloCommandCenter({
  notifications,
}: Props) {
  return (
    <section className="rounded-3xl border border-green-500/30 bg-slate-900 p-8">
      <h2 className="text-3xl font-black text-white">
        🦜 Pendant ton absence
      </h2>

      <p className="mt-2 text-slate-400">
        Pilo continue de surveiller tes contrats même lorsque tu n'es pas connecté.
      </p>

      <div className="mt-8 space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white">
                {notification.title}
              </h3>

              <span
                className={
                  notification.priority === "red"
                    ? "text-red-400"
                    : notification.priority === "yellow"
                    ? "text-yellow-400"
                    : "text-green-400"
                }
              >
                ●
              </span>
            </div>

            <p className="mt-2 text-slate-400">
              {notification.message}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}