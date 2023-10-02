import { Component, OnInit } from "@angular/core";
import { ReceitaCategoria, ReceitasResponse } from "../../models";
import { ActivatedRoute } from "@angular/router";
import { ReceitasService } from "../../services";
import { Subscription } from "rxjs";
import { AlertController, NavController } from "@ionic/angular";
import { FavoritosService } from "../../../favoritos/services";
import { FavoritoRequest } from "../../../favoritos/models";

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
  favorito: boolean = false;

  constructor(
    private alertController: AlertController,
    private nav: NavController,
    private activatedRoute: ActivatedRoute,
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
  }

  onClickVisualizarReceita(receita: ReceitasResponse): void {
    window.localStorage.setItem("receita", JSON.stringify(receita));
    this.nav.navigateForward(["tabs/receitas/detalhes"]);
  }

  onClickAlterarFavorito(item: ReceitasResponse): void {
    if (!item.id) {
      return;
    }

    const changedFavorited = !item.favorited;

    if (this.favoriteLoading) {
      return;
    }

    this.favoriteLoading = true;
    const request = new FavoritoRequest(item.id, changedFavorited);
    this.inscricao = this.favoritosService.putFavorito(request).subscribe({
      next: () => {
        this.favoriteLoading = false;
      },
      error: () => {
        this.favoriteLoading = false;
      },
      complete: () => {
        this.favoriteLoading = false;

        this.favoriteLoading = true;
        this.inscricao = this.receitasService.getAllReceitas().subscribe({
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
    this.inscricao.unsubscribe();
  }
}
