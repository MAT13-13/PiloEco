import { Injectable } from "@nestjs/common";

export type PiloLevel = {
  level: number;
  name: string;
  minXp: number;
};

@Injectable()
export class ProfileService {
  private levels: PiloLevel[] = [
    { level: 1, name: "Débutant", minXp: 0 },
    { level: 2, name: "Économe", minXp: 100 },
    { level: 3, name: "Stratège", minXp: 300 },
    { level: 4, name: "Expert", minXp: 700 },
    { level: 5, name: "Maître Pilo", minXp: 1200 },
  ];

  getLevelFromXp(xp: number) {
    return [...this.levels].reverse().find((level) => xp >= level.minXp);
  }

  calculateProfile(currentXp: number, xpToAdd: number) {
    const newXp = currentXp + xpToAdd;
    const level = this.getLevelFromXp(newXp);

    return {
      xp: newXp,
      level: level?.level ?? 1,
      levelName: level?.name ?? "Débutant",
      nextLevel: this.levels.find((item) => item.minXp > newXp) ?? null,
    };
  }
}