import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../../services";
import { FamiliaRequest, UsuarioRequest } from "../../models";
import { Subscription } from "rxjs";
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
// import { StorageService } from "../../../../../temp/src/lib/tools/services/storage.service";
import { ActivatedRoute, Router } from "@angular/router";
import { calculateAge } from "../../../../../temp/src/lib/tools/utils";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-criar-conta-interno",
  templateUrl: "./criar-conta-interno.component.html",
  styleUrls: ["./criar-conta-interno.component.scss"],
})
export class CriarContaInternoComponent implements OnInit {
  inscricaoFamilia: Subscription = Subscription.EMPTY;
  inscricaoUsuario: Subscription = Subscription.EMPTY;
  form!: FormGroup;

  nomeDaFamilia!: string;
  email!: string;
  dataDeNascimento!: string;

  public alertButtons = ["OK"];

  public getForm(): FormGroup {
    return this.form;
  }

  public get getNomeRequired(): any {
    return (
      this.form.get("nome")?.touched &&
      this.form.get("nome")?.errors?.["required"]
    );
  }
  public get getNomeInvalid(): any {
    return (
      this.form.get("nome")?.touched &&
      this.form.get("nome")?.errors?.["minlength"]
    );
  }

  public get getCelularRequired(): any {
    return (
      this.form.get("celular")?.touched &&
      this.form.get("celular")?.errors?.["required"]
    );
  }
  public get getCelularInvalid(): any {
    return (
      this.form.get("celular")?.touched &&
      this.form.get("celular")?.errors?.["maxLength"]
    );
  }

  public get getDataDeNascimentoInvalid(): any {
    const idade = calculateAge(new Date(this.dataDeNascimento));
    return idade >= 18;
  }

  public get getSenhaRequired(): any {
    return (
      this.form.get("senha")?.touched &&
      this.form.get("senha")?.errors?.["required"]
    );
  }
  public get getSenhaInvalid(): any {
    return (
      this.form.get("senha")?.touched &&
      this.form.get("senha")?.errors?.["minLength"]
    );
  }

  public get getSenhaRepetidaInvalid(): any {
    return (
      this.form.get("senhaRepetida")?.touched &&
      this.form.get("senhaRepetida")?.errors?.["senhaValida"]
    );
  }

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private nav: NavController,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setupForm();

    this.nomeDaFamilia = this.activatedRoute.snapshot.params["nomeDaFamilia"];
    this.email = this.activatedRoute.snapshot.params["email"];
  }

  setupForm() {
    this.form = this.formBuilder.group({
      nome: ["", [Validators.minLength(3), Validators.required]],
      celular: ["", [Validators.maxLength(15), Validators.required]],
      senha: ["", [Validators.minLength(6), Validators.required]],
      senhaRepetida: ["", [Validators.minLength(6), Validators.required]],
    });

    this.form
      .get("senhaRepetida")
      ?.addValidators(this.senhaValidator(this.form));
  }

  onClickCriarConta() {
    const requestFamilia = new FamiliaRequest(this.nomeDaFamilia);
    let requestUsuario = new UsuarioRequest(
      this.form.controls["nome"].value,
      this.dataDeNascimento,
      this.form.controls["celular"].value,
      this.email,
      this.form.controls["senha"].value,
      "",
      "111111111111111111111111"
    );

    this.inscricaoFamilia = this.authService
      .criarFamilia(requestFamilia)
      .subscribe((o) => {
        if (o) {
          requestUsuario.familyId = o.id;
          console.log(o.id);
          console.log(requestUsuario.familyId);

          this.inscricaoUsuario = this.authService
            .criarUsuario(requestUsuario)
            .subscribe((o) => {
              window.localStorage.setItem("user", JSON.stringify(o));
              this.nav.navigateForward(["auth/sucesso", "criada"]);
            });
        }
      });
  }

  senhaValidator(form: FormGroup): ValidatorFn {
    const senha = form.get("senha");
    const senhaRepetida = form.get("senhaRepetida");

    const validator = () =>
      senha?.value === senhaRepetida?.value ? null : { senhaValida: true };

    return validator;
  }

  ngOnDestroy(): void {
    this.inscricaoFamilia.unsubscribe();
    this.inscricaoUsuario.unsubscribe();
  }
}
