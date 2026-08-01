import { Body, Controller, Post } from "@nestjs/common";
import { ProfileService } from "./profile.service";

@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post("xp")
  addXp(@Body() body: { currentXp: number; xpToAdd: number }) {
    return this.profileService.calculateProfile(
      Number(body.currentXp || 0),
      Number(body.xpToAdd || 0),
    );
  }
}