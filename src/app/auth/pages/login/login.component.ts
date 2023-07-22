import { Component, OnInit } from "@angular/core";
import { LoginRequest } from "../../models";
import { Subscription } from "rxjs";
import { AuthService } from "../../services";
import { Router } from "@angular/router";

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onClickLogIn() {
    const request = new LoginRequest(this.email, this.senha);
    this.inscricao = this.authService.login(request).subscribe((_) => {
      this.router.navigate(["/tabs/receitas"]);
    });
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}
