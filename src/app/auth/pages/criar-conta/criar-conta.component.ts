import { Component, OnInit } from "@angular/core";
import { CriarContaInternoComponent } from "../criar-conta-interno/criar-conta-interno.component";
import {
  ActionSheetController,
  CheckboxCustomEvent,
  NavController,
} from "@ionic/angular";

@Component({
  selector: "app-criar-conta",
  templateUrl: "./criar-conta.component.html",
  styleUrls: ["./criar-conta.component.scss"],
})
export class CriarContaComponent implements OnInit {
  nomeDaFamilia!: string;
  email!: string;
  component = CriarContaInternoComponent;

  canDismiss: boolean = false;
  presentingElement!: any;

  isModalTermosDeUsoOpen: boolean = false;
  isModalTermosDeUsoCriarContaOpen: boolean = false;

  isAlertOpen: boolean = false;
  alertButtons: string[] = ["OK"];

  public setOpenTermosDeUso(isOpen: boolean) {
    this.isModalTermosDeUsoOpen = isOpen;
  }

  public setOpenTermosDeUsoCriarConta(isOpen: boolean) {
    this.isModalTermosDeUsoCriarContaOpen = isOpen;
  }

  public setOpenAlert(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  constructor(private nav: NavController) {}

  async ngOnInit() {
    this.presentingElement = document.querySelector(".ion-page");
  }

  onClickProsseguir() {
    if (!this.nomeDaFamilia && !this.email) {
      this.setOpenAlert(true);
      return;
    }
    if (this.canDismiss == true) {
      this.nav.navigateForward([
        "auth/criar-conta",
        this.nomeDaFamilia,
        this.email,
      ]);
    }
  }

  onClickNavigateToLogin() {
    this.nav.navigateForward(["auth/login"]);
  }

  onTermsChanged(event: Event) {
    const ev = event as CheckboxCustomEvent;
    this.canDismiss = ev.detail.checked;
  }
}
