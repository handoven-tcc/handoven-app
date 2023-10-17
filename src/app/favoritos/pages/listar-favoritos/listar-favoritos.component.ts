import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AlertController, NavController } from "@ionic/angular";
import { AuthService } from "../../../auth/services";
import { FavoritosService } from "../../services";
import { ReceitasResponse } from "../../../receitas/models";
import { FavoritoRequest } from "../../models";
import { FamiliaRequest, GetFamiliaIdRequest } from "../../../auth/models";

@Component({
  selector: "app-listar-favoritos",
  templateUrl: "./listar-favoritos.component.html",
  styleUrls: ["./listar-favoritos.component.scss"],
})
export class ListarFavoritosComponent implements OnInit {
  loading: boolean = false;
  favoritos: any[] = [];
  inscricao: Subscription = Subscription.EMPTY;
  inscricaoFamily: Subscription = Subscription.EMPTY;
  usuarioId: string = "";
  familiaId: string = "";

  constructor(
    private alertController: AlertController,
    private nav: NavController,
    private authService: AuthService,
    private favoritosService: FavoritosService
  ) {
    this.usuarioId = this.authService.getUsuarioId() ?? "";
    this.familiaId = this.authService.getFamiliaId() ?? "";
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

    const requestFamilia = new GetFamiliaIdRequest(
      this.usuarioId,
      this.familiaId
    );
    this.loading = true;
    this.inscricaoFamily = this.authService
      .getFamilia(requestFamilia)
      .subscribe({
        next: (o) => {
          this.inscricao = this.favoritosService
            .getAllFavoritos(o.plates_favorites)
            .subscribe({
              next: (o) => {
                this.favoritos = o;
                this.loading = false;
              },
              error: () => (this.loading = false),
              complete: () => (this.loading = false),
            });
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
          "Esta ação te fará remover essa receita dos favoritos, você tem certeza disso?",
        buttons: [
          {
            text: "Cancelar",
            role: "cancel",
            handler: () => {},
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
    if (this.loading) {
      return;
    }

    const requestFamilia = new GetFamiliaIdRequest(
      this.usuarioId,
      this.familiaId
    );
    this.loading = true;
    this.inscricaoFamily = this.authService
      .getFamilia(requestFamilia)
      .subscribe({
        next: (o) => {
          this.inscricao = this.favoritosService
            .deleteFavorito(item.id)
            .subscribe({
              next: () => {
                this.alertController
                  .create({
                    header: item.name,
                    message: `A Receita foi removida dos favoritos com sucesso!`,
                    buttons: ["Ok"],
                  })
                  .then((o) => o.present());

                this.loading = false;
              },
              error: () => (this.loading = false),
              complete: () => {
                this.loading = false;
                this.getTodosFavoritos();
              },
            });
        },
        error: () => (this.loading = false),
        complete: () => (this.loading = false),
      });
  }

  onClickRefresh(): void {
    if (this.loading || !this.usuarioLogado) {
      return;
    }

    const requestFamilia = new GetFamiliaIdRequest(
      this.usuarioId,
      this.familiaId
    );
    this.loading = true;
    this.inscricaoFamily = this.authService
      .getFamilia(requestFamilia)
      .subscribe({
        next: (o) => {
          this.inscricao = this.favoritosService
            .getAllFavoritos(o.plates_favorites)
            .subscribe({
              next: (o) => {
                this.favoritos = o;
                this.loading = false;
              },
              error: () => (this.loading = false),
              complete: () => (this.loading = false),
            });
        },
        error: () => (this.loading = false),
        complete: () => (this.loading = false),
      });
  }

  handleRefresh(event: any): void {
    if (this.loading) {
      return;
    }

    const requestFamilia = new GetFamiliaIdRequest(
      this.usuarioId,
      this.familiaId
    );
    this.loading = true;
    this.inscricaoFamily = this.authService
      .getFamilia(requestFamilia)
      .subscribe({
        next: (o) => {
          this.inscricao = this.favoritosService
            .getAllFavoritos(o.plates_favorites)
            .subscribe({
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
        },
        error: () => (this.loading = false),
        complete: () => (this.loading = false),
      });
  }

  onClickVisualizarReceita(receita: ReceitasResponse): void {
    window.localStorage.setItem("receita", JSON.stringify(receita));
    this.nav.navigateForward(["tabs/receitas/detalhes"]);
  }

  ngOnDestroy(): void {
    this.inscricaoFamily.unsubscribe();
    this.inscricao.unsubscribe();
  }
}
