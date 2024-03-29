import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
// import { StorageService } from "../../../../../temp/src/lib/tools/services/storage.service";
import { ActivatedRoute } from "@angular/router";
import { CalculateAge } from "temp/src/lib/tools/utils";
import { AuthService } from "../../../auth/services";
import {
  UsuarioRequest,
  LoginResponse,
  UsuarioResponse,
} from "../../../auth/models";
import { AlertController, NavController } from "@ionic/angular";

@Component({
  selector: "app-editar-perfil",
  templateUrl: "./editar-perfil.component.html",
  styleUrls: ["./editar-perfil.component.scss"],
})
export class EditarPerfilComponent implements OnInit {
  loading: boolean = false;
  inscricao: Subscription = Subscription.EMPTY;
  form!: FormGroup;
  perfil!: LoginResponse;

  nomeDaFamilia!: string;
  email!: string;
  dataDeNascimento!: string;

  public alertButtons = ["OK"];

  public getForm(): FormGroup {
    return this.form;
  }

  public getDisableEditarIntegrante(): boolean {
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
    const idade = CalculateAge(new Date(this.dataDeNascimento));
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
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.perfil = JSON.parse(this.authService.getPerfil() ?? "");
    this.setupForm(this.perfil);

    this.nomeDaFamilia = this.activatedRoute.snapshot.params["nomeDaFamilia"];
    this.email = this.perfil.email;
    this.dataDeNascimento = this.perfil.birthDate;
  }

  setupForm({ name, cell }: LoginResponse): void {
    this.form = this.formBuilder.group({
      nome: [name, [Validators.minLength(3), Validators.required]],
      celular: [cell, [Validators.maxLength(15), Validators.required]],
      senha: ["", [Validators.minLength(6), Validators.required]],
    });

    this.form
      .get("senhaRepetida")
      ?.addValidators(this.senhaValidator(this.form));
  }

  onClickEditarConta(): void {
    this.loading = true;
    const user: UsuarioResponse = JSON.parse(
      this.authService.getPerfil() ?? ""
    );

    let request = new UsuarioRequest(
      this.form.controls["nome"].value,
      this.dataDeNascimento,
      this.form.controls["celular"].value,
      this.email,
      this.form.controls["senha"].value,
      user.familyId,
      user.id
    );

    this.inscricao = this.authService.editarUsuario(request).subscribe({
      next: (o) => {
        window.localStorage.setItem("perfil", JSON.stringify(o));
        this.nav.navigateForward(["auth/sucesso", "editada"]);
        this.loading = false;
      },
      error: () => (this.loading = false),
      complete: () => (this.loading = false),
    });
  }

  onClickCancelar(): void {
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
