import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { DeletarProdutoRequest, ProdutoResponse } from "../../models";
import { DispensaService } from "../../services";
import {
  AlertController,
  NavController,
  ModalController,
  IonicSafeString,
} from "@ionic/angular";
import { AuthService } from "../../../auth/services";
import { ReceitaIngredienteCategoria } from "../../../receitas/models";

@Component({
  selector: "app-listar-dispensa",
  templateUrl: "./listar-dispensa.component.html",
  styleUrls: ["./listar-dispensa.component.scss"],
})
export class ListarDispensaComponent implements OnInit {
  loading: boolean = false;
  produtos: ProdutoResponse[] = [];
  inscricao: Subscription = Subscription.EMPTY;

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private nav: NavController,
    private authService: AuthService,
    private dispensaService: DispensaService
  ) {}

  public get hasProdutos(): boolean {
    return this.produtos.length > 0;
  }

  public get usuarioLogado(): boolean {
    return this.authService.hasUsuario();
  }

  public getDisableAdicionarDispensa(): boolean {
    return !this.loading;
  }

  ngOnInit(): void {
    this.getTodosProdutos();
  }

  ionViewWillEnter(): void{
    this.getTodosProdutos();
  }

  getTodosProdutos(): void{
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.inscricao = this.dispensaService.getAllProducts().subscribe({
      next: (o) => {
        this.produtos = o;
        this.loading = false;
      },
      error: () => (this.loading = false),
      complete: () => (this.loading = false),
    });
  }

  onClickAdicionarDispensa(): void {
    if (this.loading) {
      return;
    }

    if (!this.authService.hasUsuario()) {
      this.alertController
        .create({
          header: "Faça Login ou Cadastre-se",
          message:
            "Essa função não está disponível para convidados. Por favor faça login ou Cadastre-se no Handoven!",
          buttons: ["OK"],
        })
        .then((o) => o.present());

      return;
    }

    this.nav.navigateForward(["tabs/dispensa/adicionar-produto"]);
  }

  onClickModalEditarProduto(item: ProdutoResponse): void{
    if (this.loading) {
      return;
    }

    this.nav.navigateForward([
      "tabs/dispensa/editar-produto",
      JSON.stringify(item),
    ]);
  }

  onClickModalExcluirProduto(item: ProdutoResponse): void {
    if (this.loading) {
      return;
    }

    this.alertController
      .create({
        header: "Tem certeza?",
        message:
          "Esta ação te fará excluir seu produto permanentemente , você tem certeza disso?",
        buttons: [
          {
            text: "Cancelar",
            role: "cancel",
            handler: () => {},
          },
          {
            text: "Ok",
            handler: () => this.excluirProduto(item),
          },
        ],
      })
      .then((o) => o.present());
  }

  excluirProduto(item: ProdutoResponse): void{
    if (this.loading) {
      return;
    }

    this.loading = true;
    const request = new DeletarProdutoRequest(item.id);
    this.inscricao = this.dispensaService
      .deletarProdutoById(request)
      .subscribe({
        next: () => {
          this.alertController
            .create({
              header: item.name,
              message: `O Produto foi deletado com sucesso!`,
              buttons: ["Ok"],
            })
            .then((o) => o.present());

          this.loading = false;
        },
        error: () => (this.loading = false),
        complete: () => {
          this.loading = false;
          this.getTodosProdutos();
        },
      });
  }

  handleRefresh(event: any): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.inscricao = this.dispensaService.getAllProducts().subscribe({
      next: (o) => {
        this.produtos = o;
        this.loading = false;
        event.target.complete();
      },
      error: () => {
        this.loading = false;
        event.target.complete();
      },
      complete: () => {
        this.loading = false;
        event.target.complete();
      },
    });
  }

  formatarData(value: string): string {
    const data: Date = new Date(value);
    const dia: number = data.getUTCDate();
    const mes: number = data.getUTCMonth() + 1;
    const ano: number = data.getUTCFullYear();

    return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
  }

  formatarParaReais(valor: string): string {
    const numero = Number(valor);
    const valorFormatado = numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });

    return valorFormatado;
  }

  onClickVisualizarProduto(item: ProdutoResponse): void {
    this.alertController
      .create({
        header: item.name,
        message: new IonicSafeString(`
<div>
   <div class="flex align-items-center gap-2 justify-content-start pb-2">
    <label class="text-900 text-sm px-1 border-round" style="background-color: lightblue">${ReceitaIngredienteCategoria[item.category]}</label>
    <label class="text-900 text-sm px-1 border-round" style="background-color: bisque">${item.type}</label>
  </div>

<div class="grid">
  <div class="col-7">
    <div class="text-900 text-sm">Valor:</div>
    <label class="text-900 text-xl">${this.formatarParaReais(item.cost)}</label>
  </div>

  <div class="col-5">
    <div class="text-900 text-sm">Quantidade:</div>
    <label class="w-full flex justify-content-start align-items-end gap-2 text-900 text-xl">${item.amount} <small>${item.unitMeasure}</small> </label>
  </div>

  <div class="col-7">
    <div class="text-900 text-sm">Data de Validade:</div>
    <label
      class="text-900 text-xl px-1 border-round"
      ${item.expiryProduct ? "style=\"background-color: #FFCED6\"" : "style=\"background-color: #BAF6B6\""}
    >${this.formatarData(item.validity)}</label>
  </div>

  <div class="col-5">
    <div class="text-900 text-sm">&nbsp;</div>
    <label class="text-red-500">${item.expiryProduct ? "Vencido" : ""}</label>
  </div>
</div>

</div>
      `),
        buttons: ["Ok"],

      })
      .then((o) => o.present());
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}
