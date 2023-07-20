import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { StorageService } from "../../../../temp/src/lib/tools/services/storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storage: StorageService) {}

  async canActivate(): Promise<boolean> {
    // const token = await this.storage.get("token");
    const token = window.localStorage.getItem("token");

    if (!token) {
      this.router.navigate(["auth/login"]);
      return false;
    }

    return true;
  }
}
