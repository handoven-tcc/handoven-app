import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private nav: NavController) {}

  ngOnInit() {}

  onClickLogin() {
    this.nav.navigateForward(["auth/login"]);
  }

  onClickCriarConta() {
    this.nav.navigateForward(["auth/criar-conta"]);
  }
}
