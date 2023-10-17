import { Component, OnInit } from "@angular/core";
import { ReceitaCategoria, ReceitasResponse } from "../../models";
import { ActivatedRoute } from "@angular/router";
import { ReceitasService } from "../../services";
import { Subscription } from "rxjs";
import { AlertController, NavController } from "@ionic/angular";
import { FavoritosService } from "../../../favoritos/services";
import { FavoritoRequest } from "../../../favoritos/models";
import { AuthService } from "../../../auth/services";
import { GetFamiliaIdRequest } from "../../../auth/models";

@Component({
  selector: "app-listar-categoria-receitas",
  templateUrl: "./listar-categoria-receitas.component.html",
  styleUrls: ["./listar-categoria-receitas.component.scss"],
})
export class ListarCategoriaReceitaComponent implements OnInit {
  protected readonly ReceitaCategoria = ReceitaCategoria;
  loading: boolean = false;
  favoriteLoading: boolean = false;
  receitas: ReceitasResponse[] = [];
  category!: ReceitaCategoria;
  inscricao: Subscription = Subscription.EMPTY;
  inscricaoFavorito: Subscription = Subscription.EMPTY;
  favorito: boolean = false;
  receitasFavoritadas: string[] = [];

  constructor(
    private alertController: AlertController,
    private nav: NavController,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private receitasService: ReceitasService,
    private favoritosService: FavoritosService
  ) {}

  public get hasReceitas(): boolean {
    return this.receitas.length > 0;
  }

  ngOnInit(): void {
    this.loading = true;
    this.favoriteLoading = false;

    this.category = JSON.parse(
      this.activatedRoute.snapshot.params["categoria"]
    ) as ReceitaCategoria;

    this.inscricao = this.receitasService
      .getReceitasByCategoria(this.category)
      .subscribe({
        next: (o: ReceitasResponse[]): void => {
          this.receitas = o;
          this.loading = false;
        },
        error: () => (this.loading = false),
        complete: () => (this.loading = false),
      });

    this.favoriteLoading = true;
    const requestFamilia = new GetFamiliaIdRequest(
      this.authService.getUsuarioId() ?? "",
      this.authService.getFamiliaId() ?? ""
    );
    this.inscricaoFavorito = this.authService
      .getFamilia(requestFamilia)
      .subscribe({
        next: (o) => {
          this.receitasFavoritadas = o.plates_favorites;
          this.favoriteLoading = false;
        },
        error: (err) => {
          this.favoriteLoading = false;
        },
        complete: () => {
          this.favoriteLoading = false;
        },
      });
  }

  public getItemFavorito(item: ReceitasResponse): boolean {
    return this.receitasFavoritadas.includes(item.id ?? "");
  }

  public tempoDePreparo(receita: ReceitasResponse): string {
    let tempo = receita.section.extras[0].split(": ");
    return tempo[1];
  }

  handleRefresh(event: any): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.inscricao = this.receitasService
      .getReceitasByCategoria(this.category)
      .subscribe({
        next: (o) => {
          this.receitas = o;
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

    this.favoriteLoading = true;
    const requestFamilia = new GetFamiliaIdRequest(
      this.authService.getUsuarioId() ?? "",
      this.authService.getFamiliaId() ?? ""
    );
    this.inscricaoFavorito = this.authService
      .getFamilia(requestFamilia)
      .subscribe({
        next: (o) => {
          this.receitasFavoritadas = o.plates_favorites;
          this.favoriteLoading = false;
        },
        error: (err) => {
          this.favoriteLoading = false;
        },
        complete: () => {
          this.favoriteLoading = false;
        },
      });
  }

  onClickVisualizarReceita(receita: ReceitasResponse): void {
    window.localStorage.setItem("receita", JSON.stringify(receita));
    this.nav.navigateForward(["tabs/receitas/detalhes"]);
  }

  onClickAlterarFavorito(curr: any, item: ReceitasResponse): void {
    if (!item.id) {
      return;
    }

    const changedFavorited = !this.getItemFavorito(item);

    curr.target.name = "heart-half";

    this.favoriteLoading = true;
    if (!changedFavorited) {
      this.inscricaoFavorito = this.favoritosService
        .deleteFavorito(item.id)
        .subscribe({
          next: (o) => {
            this.receitasFavoritadas = o.plates_favorites;
            this.favoriteLoading = false;
          },
          error: () => {
            this.favoriteLoading = false;
          },
          complete: () => {
            this.favoriteLoading = false;

            this.favoriteLoading = true;
            this.inscricao = this.receitasService
              .getReceitasByCategoria(this.category)
              .subscribe({
                next: (o) => {
                  this.receitas = o;

                  this.favoriteLoading = false;
                },
                error: () => {
                  this.favoriteLoading = false;
                },
                complete: () => {
                  this.favoriteLoading = false;
                },
              });
          },
        });
      return;
    }

    this.inscricaoFavorito = this.favoritosService
      .putFavorito(item.id)
      .subscribe({
        next: (o) => {
          this.receitasFavoritadas = o.plates_favorites;
          this.favoriteLoading = false;
        },
        error: () => {
          this.favoriteLoading = false;
        },
        complete: () => {
          this.favoriteLoading = false;

          this.favoriteLoading = true;
          this.inscricao = this.receitasService
            .getReceitasByCategoria(this.category)
            .subscribe({
              next: (o) => {
                this.receitas = o;

                this.favoriteLoading = false;
              },
              error: () => {
                this.favoriteLoading = false;
              },
              complete: () => {
                this.favoriteLoading = false;
              },
            });
        },
      });
  }

  ngOnDestroy(): void {
    this.inscricaoFavorito.unsubscribe();
    this.inscricao.unsubscribe();
  }
}
