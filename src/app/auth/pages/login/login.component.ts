import { Component, OnInit } from "@angular/core";
import { LoginRequest, UsuarioResponse } from "../../models";
import { Subscription } from "rxjs";
import { AuthService } from "../../services";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  inscricao: Subscription = Subscription.EMPTY;
  email!: string;
  senha!: string;
  lembrar!: string;

  alertButtons: string[] = ["OK"];

  public getDisableLogin() {
    return this.email && this.senha ? true : false;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private nav: NavController
  ) {}

  ngOnInit() {}

  onClickLogIn() {
    const request = new LoginRequest(this.email, this.senha);
    this.inscricao = this.authService.login(request).subscribe(() => {
      this.router.navigate(["/tabs/receitas"]);
    });
  }

  onClickNavigateToLogin() {
    this.nav.navigateForward(["auth/criar-conta"]);
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}
