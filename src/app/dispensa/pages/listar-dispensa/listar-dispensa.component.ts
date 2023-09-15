import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { DeletarProdutoRequest, ProdutoResponse } from "../../models";
import { DispensaService } from "../../services";
import { AlertController, NavController } from "@ionic/angular";
import { AuthService } from "../../../auth/services";

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

  ionViewWillEnter() {
    this.getTodosProdutos();
  }

  getTodosProdutos() {
    if (this.loading === true) {
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
    if (this.loading == true) {
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

  onClickModalEditarProduto(id: string) {
    if (this.loading == true) {
      return;
    }

    this.alertNaoImplementado();
  }

  onClickModalExcluirProduto(item: ProdutoResponse) {
    if (this.loading == true) {
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

  excluirProduto(item: ProdutoResponse) {
    if (this.loading == true) {
      return;
    }

    this.loading = true;
    const request = new DeletarProdutoRequest(item.id);
    this.inscricao = this.dispensaService
      .deletarProdutoById(request)
      .subscribe({
        next: (o) => {
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

  handleRefresh(event: any) {
    if (this.loading === true) {
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

  onClickVisualizarProduto(item: ProdutoResponse) {
    this.alertController
      .create({
        header: "Ainda incompleto...",
        message: JSON.stringify(item),
        buttons: ["Ok"],
      })
      .then((o) => o.present());
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
