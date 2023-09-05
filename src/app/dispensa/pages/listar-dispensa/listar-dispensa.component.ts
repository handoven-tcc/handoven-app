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
  produtos: ProdutosResponse[] = [];
  inscricao: Subscription = Subscription.EMPTY;

  constructor(
    private dispensaService: DispensaService,
    private alertController: AlertController,
    private nav: NavController
  ) {}

  ngOnInit() {
    this.inscricao = this.dispensaService.getAllProducts().subscribe((o) => {
      console.log(o);
      this.produtos = o;
    });
  }

  onClickAdicionarDispensa() {
    this.alertController
      .create({
        header: "Oops...",
        message: "Desculpe, isso ainda não foi implementado 😢",
      })
      .then((o) => o.present());
    // this.nav.navigateForward(["tabs/dispensa/adicionar-a-dispensa"]);
  }

  onClickModalEditarProduto(id: string) {
    this.alertController
      .create({
        header: "Oops...",
        message: "Desculpe, isso ainda não foi implementado 😢",
      })
      .then((o) => o.present());
  }

  onClickModalExcluirProduto(id: string) {
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
    this.alertController
      .create({
        header: "Oops...",
        message: "Desculpe, isso ainda não foi implementado 😢",
      })
      .then((o) => o.present());
    // const request = new DeletarProdutoRequest(id);
    // this.inscricao = this.dispensaService
    //   .deletarProdutoById(request)
    //   .subscribe((o) => {
    //     console.log(o);
    //   });
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}
