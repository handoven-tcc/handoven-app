import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
// import { StorageService } from "../../../../temp/src/lib/tools/services/storage.service";
import { AuthService } from "../services";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    // private storage: StorageService,
    private authService: AuthService
  ) {}

  async canActivate(): Promise<boolean> {
    const token = this.authService.getAuthToken();

    if (!token) {
      this.router.navigate(["auth/home"]);
      return false;
    }

    return true;
  }
}
