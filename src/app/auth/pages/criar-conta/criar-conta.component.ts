import { Component, OnInit } from "@angular/core";
import { CriarContaInternoComponent } from "../criar-conta-interno/criar-conta-interno.component";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-criar-conta",
  templateUrl: "./criar-conta.component.html",
  styleUrls: ["./criar-conta.component.scss"],
})
export class CriarContaComponent implements OnInit {
  nomeDaFamilia!: string;
  email!: string;

  component = CriarContaInternoComponent;

  constructor(private nav: NavController) {}

  ngOnInit() {}

  onClickProsseguir() {
    this.nav.navigateForward([
      "auth/criar-conta",
      this.nomeDaFamilia,
      this.email,
    ]);
  }
}
