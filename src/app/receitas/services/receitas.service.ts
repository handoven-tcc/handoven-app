import { Injectable } from "@angular/core";
import {
  concatMap,
  distinct,
  filter,
  from,
  map,
  Observable,
  of,
  reduce,
  toArray,
} from "rxjs";
import { AuthService } from "../../auth/services";
import Plates from "../../../assets/mock/plates.json";
import { environment } from "../../../environments/environment";
import { ReceitaCategoria, ReceitaRequest, ReceitasResponse } from "../models";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ReceitasService {
  private familiaId!: string;
  private usuarioId!: string;

  private get url(): string {
    return `${environment.api}/plates`;
  }

  constructor(private http: HttpClient, private authService: AuthService) {
    this.familiaId = this.authService.getFamiliaId() ?? "";
    this.usuarioId = this.authService.getUsuarioId() ?? "";
  }

  getAllReceitas(): Observable<ReceitasResponse[]> {
    if (!this.authService.hasUsuario()) {
      return of([] as ReceitasResponse[]);
    }

    return this.http
      .get(this.url, {
        headers: {
          "X-HandOven-User": this.usuarioId,
          "X-handOven-Service": "false",
          "X-HandOven-Family": this.familiaId,
        },
      })
      .pipe(map((res: any) => res));
  }

  getReceitaById(id?: string): Observable<ReceitasResponse> {
    if (!this.authService.hasUsuario() || !id) {
      return of({} as ReceitasResponse);
    }

    return this.http
      .get(`${this.url}/${id}`, {
        headers: {
          "X-HandOven-User": this.usuarioId,
          "X-handOven-Service": "false",
          "X-HandOven-Family": this.familiaId,
        },
      })
      .pipe(map((res: any) => res));
  }

  getAllCategorias(): Observable<ReceitaCategoria[]> {
    if (!this.authService.hasUsuario()) {
      return of([] as ReceitaCategoria[]);
    }

    return this.http
      .get(this.url, {
        headers: {
          "X-HandOven-User": this.usuarioId,
          "X-HandOven-Family": this.familiaId,
        },
      })
      .pipe(
        map((res: any) => res),
        concatMap(from),
        map((receita) => receita.category),
        distinct((o) => o),
        toArray()
      );
  }

  getReceitasByCategoria(
    categoria: ReceitaCategoria
  ): Observable<ReceitasResponse[]> {
    if (!this.authService.hasUsuario()) {
      return of([] as ReceitasResponse[]);
    }

    return this.http
      .get(this.url, {
        headers: {
          "X-HandOven-User": this.usuarioId,
          "X-HandOven-Family": this.familiaId,
        },
      })
      .pipe(
        map((res: any) => res),
        concatMap(from),
        filter((o) => o.category == categoria),
        toArray()
      );
  }
}
