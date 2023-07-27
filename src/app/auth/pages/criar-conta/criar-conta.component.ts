import { Component, OnInit } from "@angular/core";
import { CriarContaInternoComponent } from "../criar-conta-interno/criar-conta-interno.component";
import {
  ActionSheetController,
  CheckboxCustomEvent,
  NavController,
} from "@ionic/angular";
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-criar-conta",
  templateUrl: "./criar-conta.component.html",
  styleUrls: ["./criar-conta.component.scss"],
})
export class CriarContaComponent implements OnInit {
  component = CriarContaInternoComponent;
  form!: FormGroup;

  canDismiss: boolean = false;
  presentingElement!: any;

  isModalTermosDeUsoOpen: boolean = false;
  isModalTermosDeUsoCriarContaOpen: boolean = false;

  alertButtons: string[] = ["OK"];

  public getForm(): FormGroup {
    return this.form;
  }

  public setOpenTermosDeUso(isOpen: boolean) {
    this.isModalTermosDeUsoOpen = isOpen;
  }

  public setOpenTermosDeUsoCriarConta(isOpen: boolean) {
    this.isModalTermosDeUsoCriarContaOpen = isOpen;
  }

  public get getNomeDaFamiliaRequired(): any {
    return (
      this.form.get("nomeDaFamilia")?.touched &&
      this.form.get("nomeDaFamilia")?.errors?.["required"]
    );
  }

  public get getNomeDaFamiliaInvalid(): any {
    return (
      this.form.get("nomeDaFamilia")?.touched &&
      this.form.get("nomeDaFamilia")?.errors?.["minlength"]
    );
  }

  public get getEmailRequired(): any {
    return (
      this.form.get("email")?.touched &&
      this.form.get("email")?.errors?.["required"]
    );
  }

  public get getEmailInvalid(): any {
    return (
      this.form.get("email")?.touched &&
      this.form.get("email")?.errors?.["email"]
    );
  }

  constructor(private nav: NavController, private formBuilder: FormBuilder) {}

  async ngOnInit() {
    this.presentingElement = document.querySelector(".ion-page");
    this.form = this.formBuilder.group({
      nomeDaFamilia: ["", [Validators.minLength(3), Validators.required]],
      email: ["", [Validators.email, Validators.required]],
    });
  }

  onClickFecharModal(modal: any) {
    modal.dismiss();

    if (this.canDismiss) {
      this.nav.navigateForward([
        "auth/criar-conta",
        this.form.controls["nomeDaFamilia"].value,
        this.form.controls["email"].value,
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
