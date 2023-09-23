import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable, of } from "rxjs";
import { AuthService } from "../../auth/services";
import Plates from "../../../assets/mock/plates.json";
import { ReceitasResponse } from "../models";

@Injectable({
  providedIn: "root",
})
export class FavoritosService {
  private familiaId!: string;
  private usuarioId!: string;

  private get url(): string {
    return `${environment.api}/favorits`;
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService // private storage: StorageService,
  ) {
    this.familiaId = this.authService.getFamiliaId() ?? "";
    this.usuarioId = this.authService.getUsuarioId() ?? "";
  }

  getAllFavoritos(): Observable<any[]> {
    if (!this.authService.hasUsuario()) {
      return of([] as any[]);
    }
    const plates = Plates as ReceitasResponse[]

    return of(plates.filter(o => o.favorited));

    // return this.http
    //   .get(this.url, {
    //     headers: {
    //       "X-HandOven-User": this.usuarioId,
    //       "X-HandOven-Family": this.familiaId,
    //     },
    //   })
    //   .pipe(map((res: any) => res));
  }

  removerFavorito({ id }: any): Observable<any> {
    if (!this.authService.hasUsuario()) {
      return of([] as any[]);
    }

    return of([] as any[]);

    // return this.http
    //   .delete(`${this.url}/${id}`, {
    //     headers: {
    //       "X-HandOven-User": this.usuarioId,
    //       "X-HandOven-Family": this.familiaId,
    //       "X-handOven-Service": "false",
    //     },
    //   })
    //   .pipe(map((res: any) => res));
  }
}
