import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import {
  AlertController,
  NavController,
} from "@ionic/angular";
import { AuthService } from "../../../auth/services";
import { FavoritosService } from "../../services";
import {ReceitasResponse} from "../../../receitas/models";

@Component({
  selector: "app-listar-favoritos",
  templateUrl: "./listar-favoritos.component.html",
  styleUrls: ["./listar-favoritos.component.scss"],
})
export class ListarFavoritosComponent implements OnInit {
  loading: boolean = false;
  favoritos: any[] = [];
  inscricao: Subscription = Subscription.EMPTY;

  constructor(
    private alertController: AlertController,
    private nav: NavController,
    private authService: AuthService,
    private favoritosService: FavoritosService,
  ) {
  }

  public get hasFavoritos(): boolean {
    return this.favoritos.length > 0;
  }

  public get usuarioLogado(): boolean {
    return this.authService.hasUsuario();
  }

  ngOnInit(): void {
    this.getTodosFavoritos();
  }

  ionViewWillEnter(): void {
    this.getTodosFavoritos();
  }

  getTodosFavoritos(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.inscricao = this.favoritosService.getAllFavoritos().subscribe({
      next: (o) => {
        this.favoritos = o;
        this.loading = false;
      },
      error: () => (this.loading = false),
      complete: () => (this.loading = false),
    });
  }

  onClickModalRemoverFavorito(item: any): void {
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
            handler: () => {
            },
          },
          {
            text: "Ok",
            handler: () => this.removerFavorito(item),
          },
        ],
      })
      .then((o) => o.present());
  }

  removerFavorito(item: any): void {
    this.alertNaoImplementado();
    // if (this.loading) {
    //   return;
    // }
    //
    // this.loading = true;
    // // const request = new DeletarProdutoRequest(item.id);
    // const request = item.id;
    // this.inscricao = this.favoritosService
    //   .removerFavorito(request)
    //   .subscribe({
    //     next: () => {
    //       this.alertController
    //         .create({
    //           header: item.name,
    //           message: `O Produto foi deletado com sucesso!`,
    //           buttons: ["Ok"],
    //         })
    //         .then((o) => o.present());
    //
    //       this.loading = false;
    //     },
    //     error: () => (this.loading = false),
    //     complete: () => {
    //       this.loading = false;
    //       this.getTodosFavoritos();
    //     },
    //   });
  }

  onClickRefresh(): void {
    if (this.loading || !this.usuarioLogado) {
      return;
    }

    this.loading = true;
    this.inscricao = this.favoritosService.getAllFavoritos().subscribe({
      next: (o) => {
        this.favoritos = o;
        this.loading = false;
      },
      error: () => (this.loading = false),
      complete: () => (this.loading = false),
    });
  }

  handleRefresh(event: any): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.inscricao = this.favoritosService.getAllFavoritos().subscribe({
      next: (o) => {
        this.favoritos = o;
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


  onClickVisualizarReceita(receita: ReceitasResponse): void {
    window.localStorage.setItem("receita", JSON.stringify(receita))
    this.nav.navigateForward([
      "tabs/receitas/detalhes",
    ]);
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
