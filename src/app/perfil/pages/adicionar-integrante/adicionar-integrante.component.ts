import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
// import { StorageService } from "../../../../../temp/src/lib/tools/services/storage.service";
import { calculateAge } from "../../../../../temp/src/lib/tools/utils";
import { AlertController, NavController } from "@ionic/angular";
import {
  FamiliaRequest,
  LoginResponse,
  UsuarioRequest,
} from "../../../auth/models";
import { AuthService } from "../../../auth/services";

@Component({
  selector: "app-adicionar-integrante",
  templateUrl: "./adicionar-integrante.component.html",
  styleUrls: ["./adicionar-integrante.component.scss"],
})
export class AdicionarIntegranteComponent implements OnInit {
  loading: boolean = false;
  inscricao: Subscription = Subscription.EMPTY;
  form!: FormGroup;
  familyId!: string;

  dataDeNascimento!: string;

  public alertButtons = ["OK"];

  public getForm(): FormGroup {
    return this.form;
  }

  public getDisableAdicionarIntegrante(): boolean {
    return this.form.valid && this.loading === false;
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

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private nav: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.familyId = window.localStorage.getItem("X-HandOven-Family") ?? "";
    this.setupForm();
  }

  setupForm() {
    this.form = this.formBuilder.group({
      nome: ["", [Validators.minLength(3), Validators.required]],
      email: ["", [Validators.email, Validators.required]],
      celular: ["", [Validators.maxLength(15), Validators.required]],
      senha: ["", [Validators.minLength(6), Validators.required]],
      senhaRepetida: ["", [Validators.minLength(6), Validators.required]],
    });

    this.form
      .get("senhaRepetida")
      ?.addValidators(this.senhaValidator(this.form));
  }

  onClickCriarPerfil() {
    this.loading = true;
    if (!this.familyId) {
      this.alertController
        .create({
          header: "Erro",
          message:
            "Conta atual não tem familia id? Favor Saia do perfil e entre novamente...",
        })
        .then((o) => o.present());

      this.loading = false;
      return;
    }

    let request = new UsuarioRequest(
      this.form.controls["nome"].value,
      this.dataDeNascimento,
      this.form.controls["celular"].value,
      this.form.controls["email"].value,
      this.form.controls["senha"].value,
      this.familyId,
      "111111111111111111111111"
    );

    this.inscricao = this.authService.criarUsuario(request).subscribe({
      next: (o) => {
        window.localStorage.setItem("user", JSON.stringify(o));
        this.nav.navigateForward(["auth/sucesso", "criada"]);
        this.loading = false;
      },
      error: () => (this.loading = false),
      complete: () => (this.loading = false),
    });
  }

  onClickCancelar() {
    this.nav.navigateBack(["tabs/perfil"]);
  }

  senhaValidator(form: FormGroup): ValidatorFn {
    const senha = form.get("senha");
    const senhaRepetida = form.get("senhaRepetida");

    const validator = () =>
      senha?.value === senhaRepetida?.value ? null : { senhaValida: true };

    return validator;
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}
