import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable, Subscription, map, of } from "rxjs";
import { AuthService } from "../../auth/services";
import { ReceitasResponse } from "../../receitas/models";
import { FavoritoRequest, FavoritoResponse } from "../models";
import { FamiliaResponse } from "../../auth/models";

@Injectable({
  providedIn: "root",
})
export class FavoritosService {
  private inscricao: Subscription = Subscription.EMPTY;
  private familiaId!: string;
  private usuarioId!: string;

  private get url(): string {
    return `${environment.api}/family/${this.familiaId}`;
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService // private storage: StorageService,
  ) {
    this.familiaId = this.authService.getFamiliaId() ?? "";
    this.usuarioId = this.authService.getUsuarioId() ?? "";
  }

  getAllFavoritos(plates: string[]): Observable<ReceitasResponse[]> {
    if (!this.authService.hasUsuario()) {
      return of([] as ReceitasResponse[]);
    }

    return this.http
      .get(`${environment.api}/plates`, {
        headers: {
          "X-HandOven-User": this.usuarioId,
          "X-handOven-Service": "false",
          "X-HandOven-Family": this.familiaId,
        },
      })
      .pipe(
        map((res: any) => res.filter((item: any) => plates.includes(item.id)))
      );
  }

  putFavorito(plateId: string): Observable<FamiliaResponse> {
    if (!this.authService.hasUsuario()) {
      return of({} as FamiliaResponse);
    }

    return this.http
      .put(`${this.url}/plateId/${plateId}/favorite`, null, {
        headers: {
          "X-HandOven-User": this.usuarioId,
          "X-HandOven-Family": this.familiaId,
          "X-handOven-Service": "false",
        },
      })
      .pipe(map((res: any) => res));
  }

  deleteFavorito(plateId: string): Observable<FamiliaResponse> {
    if (!this.authService.hasUsuario()) {
      return of({} as any);
    }

    return this.http
      .delete(`${this.url}/plateId/${plateId}/favorite`, {
        headers: {
          "X-HandOven-User": this.usuarioId,
          "X-HandOven-Family": this.familiaId,
          "X-handOven-Service": "false",
        },
      })
      .pipe(map((res: any) => res));
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}
