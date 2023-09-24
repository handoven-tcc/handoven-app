import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { StorageService } from "../../../../../temp/src/lib/tools/services/storage.service";
import { calculateAge } from "../../../../../temp/src/lib/tools/utils";
import { AlertController, NavController } from "@ionic/angular";
import { DispensaService } from "../../services";
import { ProdutoRequest, ProdutoResponse } from "../../models";
import { AuthService } from "../../../auth/services";
import { ActivatedRoute } from "@angular/router";
import { ReceitaIngredienteCategoria } from "../../../receitas/models";

export interface IButtonSelect {
  id: number;
  name: string;
  code: string;
}
export interface IButtonSelectComAbreviacao extends IButtonSelect {
  abbreviation: string;
}

@Component({
  selector: "app-editar-dispensa",
  templateUrl: "./editar-dispensa.component.html",
  styleUrls: ["./editar-dispensa.component.scss"],
})
export class EditarDispensaComponent implements OnInit {
  loading: boolean = false;
  inscricao: Subscription = Subscription.EMPTY;
  produto!: ProdutoResponse;
  unidadeDeMedidaDoProduto!: string;
  form!: FormGroup;
  familiaId!: string;
  dataDeVencimento!: string;
  custo!: string;
  tipo: IButtonSelect[] = [];
  selectedTipo: string = "";
  categoria: IButtonSelect[] = [];
  selectedCategoria: ReceitaIngredienteCategoria = ReceitaIngredienteCategoria.Outros;
  unidadeDeMedida: IButtonSelectComAbreviacao[] = [];
  selectedUnidadeDeMedida: string = "";

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

  public get getDataDeNascimentoInvalid(): any {
    const idade = calculateAge(new Date(this.dataDeVencimento));
    return idade >= 18;
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

  public getDisableEditarDispensa(): boolean {
    return this.form.valid && !this.loading;
  }

  constructor(
    private formBuilder: FormBuilder,
    private nav: NavController,
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private dispensaService: DispensaService
  ) {
    this.familiaId = this.authService.getFamiliaId() ?? "";
  }

  ngOnInit() {
    this.produto = JSON.parse(
      this.activatedRoute.snapshot.params["produto"]
    ) as any;

    this.tipo = [
      {
        id: 1,
        name: "Açúcar e Adoçante",
        code: "ACUCAR_ADOCANTE",
      },
      {
        id: 2,
        name: "Condimento",
        code: "CONDIMENTO",
      },
      {
        id: 3,
        name: "Doce",
        code: "DOCE",
      },
      {
        id: 4,
        name: "Especiaria",
        code: "ESPECIARIA",
      },
      {
        id: 5,
        name: "Fruta",
        code: "FRUTA",
      },
      {
        id: 6,
        name: "Grão",
        code: "GRAO",
      },
      {
        id: 7,
        name: "Lácteo",
        code: "LACTEO",
      },
      {
        id: 8,
        name: "Molho",
        code: "MOLHO",
      },
      {
        id: 9,
        name: "Noz e Semente",
        code: "NOZ_SEMESTRE",
      },
      {
        id: 10,
        name: "Massa",
        code: "MASSA",
      },
      {
        id: 11,
        name: "Vegetal",
        code: "VEGETAL",
      },
    ];

    this.categoria = [
      {
        id: 1,
        name: "Grãos e Cereais",
        code: "GRAOS",
      },
      {
        id: 2,
        name: "Proteínas",
        code: "PROTEINAS",
      },
      {
        id: 3,
        name: "Frutas e Vegetais",
        code: "FRUTAS_VEGETAIS",
      },
      {
        id: 4,
        name: "Laticínios e Substitutos",
        code: "LATICINIOS",
      },
      {
        id: 5,
        name: "Temperos e Condimentos",
        code: "CONDIMENTOS",
      },
      {
        id: 6,
        name: "Óleos e Gorduras",
        code: "OLEOS_GORDURAS",
      },
      {
        id: 7,
        name: "Bebidas e Líquidos",
        code: "BEBIDAS",
      },
      {
        id: 8,
        name: "Produtos de Panificação",
        code: "PANIFICACAO",
      },
      {
        id: 9,
        name: "Conserva",
        code: "ENLATADOS_CONSERVAS",
      },
      {
        id: 10,
        name: "Doces e Sobremesas",
        code: "DOCES_SOBREMESAS",
      },
      {
        id: 11,
        name: "Frutos do Mar",
        code: "FRUTOS_MAR",
      },
      {
        id: 12,
        name: "Nozes e Sementes",
        code: "NOZES_SEMENTES",
      },
      {
        id: 13,
        name: "Ingredientes Étnicos",
        code: "ETNICOS",
      },
      {
        id: 14,
        name: "Produtos Congelados",
        code: "CONGELADOS",
      },
      {
        id: 15,
        name: "Ingredientes Especiais",
        code: "ESPECIAIS",
      },
    ];

    this.unidadeDeMedida = [
      {
        id: 1,
        name: "Colher de Sopa",
        abbreviation: "colher (sopa)",
        code: "COLHER DE SOPA",
      },
      {
        id: 2,
        name: "Colher de Chá",
        abbreviation: "colher (chá)",
        code: "COLHER DE CHÁ",
      },
      {
        id: 3,
        name: "Gramas",
        abbreviation: "g",
        code: "GRAMAS",
      },
      {
        id: 4,
        name: "Litros",
        abbreviation: "L",
        code: "LITROS",
      },
      {
        id: 5,
        name: "Miligramas",
        abbreviation: "mg",
        code: "MILIGRAMAS",
      },
      {
        id: 6,
        name: "Mililitros",
        abbreviation: "mL",
        code: "MILILITROS",
      },
      {
        id: 7,
        name: "Peças",
        abbreviation: "un",
        code: "PEÇAS",
      },
      {
        id: 8,
        name: "Quilogramas",
        abbreviation: "kg",
        code: "QUILOGRAMAS",
      },
    ];

    this.selectedTipo = this.produto.type;
    this.selectedCategoria = this.produto.category;
    // TODO: implementar unidade de medida na api
    this.selectedUnidadeDeMedida = "";
    this.dataDeVencimento = this.produto.validity;
    console.log(this.selectedTipo, this.selectedCategoria);

    this.setupForm(this.produto);
  }

  getSelectedByName(arr: IButtonSelect[], name: string): IButtonSelect {
    return arr.find((i) => i.name == name) as IButtonSelect;
  }

  setupForm(produto: any) {
    this.form = this.formBuilder.group({
      nome: [produto.name, [Validators.minLength(3), Validators.required]],
      quantidade: [produto.amount, [Validators.required]],
      custo: [produto.cost, [Validators.required]],
    });
  }

  compareWith(o1: any, o2: any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  handleChangeTipo(event: any) {
    this.selectedTipo = event.target.value.name;
  }
  handleChangeCategoria(event: any) {
    this.selectedCategoria = event.target.value.name;
  }
  handleChangeUnidadeDeMedida(event: any) {
    this.selectedUnidadeDeMedida = event.target.value.name;
  }

  onClickEditarDispensa() {
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
      this.selectedTipo ? this.selectedTipo : "",
      this.dataDeVencimento,
      this.selectedCategoria ? this.selectedCategoria : ReceitaIngredienteCategoria.Outros,
      this.form.controls["custo"].value,
      this.form.controls["quantidade"].value,
      this.familiaId,
      this.produto.id
    );

    this.inscricao = this.dispensaService.putProductById(request).subscribe({
      next: () => {
        this.alertController
          .create({
            header: request.name,
            message: `O Produto foi editado com sucesso!`,
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

  onClickEscanear(): void {
    this.alertNaoImplementado();
  }

  alertNaoImplementado(): void {
    this.alertController
      .create({
        header: "Oops...",
        message: "Desculpe, isso ainda não foi implementado 😢",
        buttons: ["Ok"],
      })
      .then((o) => o.present());
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}
