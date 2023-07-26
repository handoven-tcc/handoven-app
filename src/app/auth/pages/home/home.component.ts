import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(
    // private storage: StorageService,
    private nav: NavController,
    private router: Router
  ) {}

  ngOnInit() {}

  onClickLogin() {
    this.nav.navigateForward(["auth/login"]);
  }

  onClickCriarConta() {
    this.nav.navigateForward(["auth/criar-conta"]);
  }

  onClickAcessarComoConvidado() {
    // this.storage.set("token", "token");
    window.localStorage.setItem("token", "token");
    this.router.navigate(["tabs/receitas"]);
  }
}
