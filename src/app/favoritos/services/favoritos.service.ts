import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable, map, of } from "rxjs";
import { AuthService } from "../../auth/services";
import { ReceitasResponse } from "../../receitas/models";
import { FavoritoRequest, FavoritoResponse } from "../models";

@Injectable({
  providedIn: "root",
})
export class FavoritosService {
  private familiaId!: string;
  private usuarioId!: string;

  private get url(): string {
    return `${environment.api}/plates`;
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService // private storage: StorageService,
  ) {
    this.familiaId = this.authService.getFamiliaId() ?? "";
    this.usuarioId = this.authService.getUsuarioId() ?? "";
  }

  getAllFavoritos(): Observable<ReceitasResponse[]> {
    if (!this.authService.hasUsuario()) {
      return of([] as ReceitasResponse[]);
    }

    return this.http
      .post(
        `${this.url}/favorites`,
        { favorited: true },
        {
          headers: {
            "X-HandOven-User": this.usuarioId,
            "X-HandOven-Family": this.familiaId,
          },
        }
      )
      .pipe(map((res: any) => res));
  }

  putFavorito(request: FavoritoRequest): Observable<FavoritoResponse> {
    if (!this.authService.hasUsuario()) {
      return of({} as FavoritoResponse);
    }

    return this.http
      .put(`${this.url}/${request.id}/favorite`, request, {
        headers: {
          "X-HandOven-User": this.usuarioId,
          "X-HandOven-Family": this.familiaId,
          "X-handOven-Service": "false",
        },
      })
      .pipe(map((res: any) => res));
  }
}
