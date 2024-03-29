import { Component, OnInit } from "@angular/core";
import { LoginRequest, UsuarioResponse } from "../../models";
import { Subscription } from "rxjs";
import { AuthService } from "../../services";
import { Router } from "@angular/router";
import { AlertController, NavController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  inscricao: Subscription = Subscription.EMPTY;
  email!: string;
  senha!: string;
  lembrar: boolean = false;

  alertButtons: string[] = ["OK"];

  public getDisableLogin(): boolean {
    return (this.email && this.senha ? true : false) && this.loading === false;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private nav: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {}

  onClickLogIn(): void {
    this.loading = true;
    const request = new LoginRequest(this.email, this.senha, this.lembrar);

    this.inscricao = this.authService.login(request).subscribe({
      next: (o) => {
        if (this.lembrar) {
          window.localStorage.setItem("perfil", JSON.stringify(o));
        } else {
          window.sessionStorage.setItem("perfil", JSON.stringify(o));
        }

        this.router.navigate(["/tabs/receitas"]);
        this.loading = false;
      },
      error: () => (this.loading = false),
      complete: () => (this.loading = false),
    });
  }

  onClickNavigateToCriarConta(): void {
    this.nav.navigateForward(["auth/criar-conta"]);
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}
