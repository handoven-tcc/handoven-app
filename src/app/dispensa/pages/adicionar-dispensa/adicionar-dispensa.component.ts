import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { StorageService } from "../../../../../temp/src/lib/tools/services/storage.service";
import { AlertController, NavController } from "@ionic/angular";
import { DispensaService } from "../../services";
import {
  IButtonSelect,
  IButtonSelectComAbreviacao,
  ProdutoRequest,
} from "../../models";
import { AuthService } from "../../../auth/services";
import { ReceitaIngredienteCategoria } from "../../../receitas/models";

@Component({
  selector: "app-adicionar-dispensa",
  templateUrl: "./adicionar-dispensa.component.html",
  styleUrls: ["./adicionar-dispensa.component.scss"],
})
export class AdicionarDispensaComponent implements OnInit {
  loading: boolean = false;
  inscricao: Subscription = Subscription.EMPTY;
  form!: FormGroup;
  familiaId!: string;
  dataDeVencimento!: string;
  custo!: string;
  tipo: IButtonSelect[] = [];
  selectedTipo: IButtonSelect | undefined;
  categoria: IButtonSelect[] = [];
  selectedCategoria: IButtonSelect | undefined;
  unidadeDeMedida: IButtonSelectComAbreviacao[] = [];
  selectedUnidadeDeMedida: IButtonSelectComAbreviacao | undefined;

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

  public get getTipoRequired(): any {
    return (
      this.form.get("tipo")?.touched &&
      this.form.get("tipo")?.errors?.["required"]
    );
  }

  public get getCategoriaRequired(): any {
    return (
      this.form.get("categoria")?.touched &&
      this.form.get("categoria")?.errors?.["required"]
    );
  }

  public get getCustoRequired(): any {
    return (
      this.form.get("custo")?.touched &&
      this.form.get("custo")?.errors?.["required"]
    );
  }

  public get getQuantidadeRequired(): any {
    return (
      this.form.get("quantidade")?.touched &&
      this.form.get("quantidade")?.errors?.["required"]
    );
  }

  public get getUnidadeDeMedidaRequired(): any {
    return (
      this.form.get("unidadeDeMedida")?.touched &&
      this.form.get("unidadeDeMedida")?.errors?.["required"]
    );
  }

  public getDisableAdicionarDispensa(): boolean {
    return this.form.valid && !this.loading;
  }

  constructor(
    private formBuilder: FormBuilder,
    private nav: NavController,
    private alertController: AlertController,
    private authService: AuthService,
    private dispensaService: DispensaService
  ) {
    this.familiaId = this.authService.getFamiliaId() ?? "";
  }

  ngOnInit() {
    this.tipo = this.dispensaService.getTipoOptions();
    this.categoria = this.dispensaService.getCategoriaOptions();
    this.unidadeDeMedida = this.dispensaService.getUnidadeDeMedidaOptions();
    this.setupForm();
  }

  setupForm() {
    this.form = this.formBuilder.group({
      nome: ["", [Validators.minLength(3), Validators.required]],
      quantidade: ["", [Validators.required]],
      custo: ["", [Validators.required]],
    });
  }

  compareWith(o1: any, o2: any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  handleChangeTipo(event: any) {
    this.selectedTipo = event.target.value;
  }
  handleChangeCategoria(event: any) {
    this.selectedCategoria = event.target.value;
  }
  handleChangeUnidadeDeMedida(event: any) {
    this.selectedUnidadeDeMedida = event.target.value;
  }

  onClickAdicionarDispensa() {
    this.loading = true;
    if (!this.familiaId) {
      this.alertController
        .create({
          header: "Erro",
          message:
            "Conta atual não tem familia? Favor Saia do perfil e entre novamente...",
        })
        .then((o) => o.present());

      this.loading = false;
      return;
    }

    const request = new ProdutoRequest(
      this.form.controls["nome"].value,
      this.selectedTipo ? this.selectedTipo.name : "",
      this.dataDeVencimento,
      this.selectedCategoria
        ? this.selectedCategoria.id
        : ReceitaIngredienteCategoria.Outros,
      this.form.controls["custo"].value,
      this.form.controls["quantidade"].value,
      this.selectedUnidadeDeMedida
        ? this.selectedUnidadeDeMedida.abbreviation
        : "",
      this.familiaId
    );

    this.inscricao = this.dispensaService.postProduct(request).subscribe({
      next: () => {
        this.alertController
          .create({
            header: request.name,
            message: `O Produto foi adicionado com sucesso!`,
            buttons: ["Ok"],
          })
          .then((o) => o.present());

        this.nav.navigateBack(["tabs/dispensa"]);
        this.loading = false;
      },
      error: () => (this.loading = false),
      complete: () => (this.loading = false),
    });
  }

  onClickCancelar(): void {
    this.nav.navigateBack(["tabs/dispensa"]);
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}
