import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { DeletarProdutoRequest, ProdutosResponse } from "../../models";
import { DispensaService } from "../../services";
import { AlertController, NavController } from "@ionic/angular";

@Component({
  selector: "app-listar-dispensa",
  templateUrl: "./listar-dispensa.component.html",
  styleUrls: ["./listar-dispensa.component.scss"],
})
export class ListarDispensaComponent implements OnInit {
  loading: boolean = false;
  produtos: ProdutosResponse[] = [];
  inscricao: Subscription = Subscription.EMPTY;

  constructor(
    private dispensaService: DispensaService,
    private alertController: AlertController,
    private nav: NavController
  ) {}

  public get hasProdutos(): boolean {
    return this.produtos.length > 0;
  }

  ngOnInit(): void {
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

    this.nav.navigateForward(["tabs/dispensa/adicionar-produto"]);
  }

  onClickModalEditarProduto(id: string) {
    if (this.loading == true) {
      return;
    }

    this.alertController
      .create({
        header: "Oops...",
        message: "Desculpe, isso ainda não foi implementado 😢",
      })
      .then((o) => o.present());
  }

  onClickModalExcluirProduto(id: string) {
    if (this.loading == true) {
      return;
    }

    this.alertController
      .create({
        header: "Tem certeza?",
        message:
          "Esta ação te fará excluir seu produto permanentemente, você tem certeza disso?",
        buttons: [
          {
            text: "Cancelar",
            role: "cancel",
            handler: () => {},
          },
          {
            text: "Ok",
            handler: () => this.excluirProduto(id),
          },
        ],
      })
      .then((o) => o.present());
  }

  excluirProduto(id: string) {
    if (this.loading == true) {
      return;
    }

    this.alertController
      .create({
        header: "Oops...",
        message: "Desculpe, isso ainda não foi implementado 😢",
      })
      .then((o) => o.present());
    // const request = new DeletarProdutoRequest(id);
    // this.inscricao = this.dispensaService
    //   .deletarProdutoById(request)
    //   .subscribe({
    //     next: (o) => {
    //       console.log(o);
    //     },
    //     error: () => (this.loading = false),
    //     complete: () => (this.loading = false),
    //   });
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}
