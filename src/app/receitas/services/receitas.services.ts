import { Injectable } from "@angular/core";
import { concatMap, distinct, filter, from, map, Observable, of, reduce, toArray } from "rxjs";
import { AuthService } from "../../auth/services";
import Plates from "../../../assets/mock/plates.json";
import { ReceitasResponse } from "../../favoritos/models";
import { environment } from "../../../environments/environment";
import { ReceitaCategoria } from "../models";

@Injectable({
  providedIn: "root",
})

export class ReceitasService {
  private familiaId!: string;
  private usuarioId!: string;

  private get url(): string {
    return `${environment.api}/plates`;
  }

  constructor(private authService: AuthService) {
    this.familiaId = this.authService.getFamiliaId() ?? "";
    this.usuarioId = this.authService.getUsuarioId() ?? "";
  }

  getAllReceitas(): Observable<ReceitasResponse[]> {
    if (!this.authService.hasUsuario()) {
      return of([] as ReceitasResponse[]);
    }

    const receitas: ReceitasResponse[] = Plates as ReceitasResponse[];
    return of(receitas).pipe(map((res: ReceitasResponse[]) => res));

    // return this.http
    //   .get(this.url, {
    //     headers: {
    //       "X-HandOven-User": this.usuarioId,
    //       "X-HandOven-Family": this.familiaId,
    //     },
    //   })
    //   .pipe(map((res: any) => res));
  }

  getAllCategorias(): Observable<ReceitaCategoria[]> {
    if (!this.authService.hasUsuario()) {
      return of([] as ReceitaCategoria[]);
    }

    const receitas: ReceitasResponse[] = Plates as ReceitasResponse[];
    return of(receitas).pipe(
      concatMap(from),
      map(receita => receita.category),
      distinct((o) => o),
      toArray()
    )

    // return this.http
    //   .get(this.url, {
    //     headers: {
    //       "X-HandOven-User": this.usuarioId,
    //       "X-HandOven-Family": this.familiaId,
    //     },
    //   })
    //   .pipe(map((res: any) => res));
  }

  getReceitaByCategoria(categoria: ReceitaCategoria): Observable<ReceitasResponse[]> {
    if (!this.authService.hasUsuario()) {
      return of([] as ReceitasResponse[]);
    }
    const receitas: ReceitasResponse[] = Plates as ReceitasResponse[];
    return of(receitas)
      .pipe(
        concatMap(from),
        filter(o => o.category == categoria),
        toArray()
      );
  }
}
