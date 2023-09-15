import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable, map, of } from "rxjs";
import {
  ProdutoRequest,
  DeletarProdutoRequest,
  GetProdutoNomeRequest,
  GetProdutoIdRequest,
  ProdutoResponse,
} from "../models";
import { AuthService } from "../../auth/services";
import Products from "../../../assets/mock/products.json";

@Injectable({
  providedIn: "root",
})
export class DispensaService {
  private familiaId!: string;
  private usuarioId!: string;

  private get url(): string {
    return `${environment.api}/products`;
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService // private storage: StorageService,
  ) {
    this.familiaId = this.authService.getFamiliaId() ?? "";
    this.usuarioId = this.authService.getUsuarioId() ?? "";
  }

  getAllProducts(): Observable<ProdutoResponse[]> {
    if (!this.authService.hasUsuario()) {
      return of([] as ProdutoResponse[]);
    }

    return this.http
      .get(this.url, {
        headers: {
          "X-HandOven-User": this.usuarioId,
          "X-HandOven-Family": this.familiaId,
        },
      })
      .pipe(map((res: any) => res));
  }

  getProductById(request: GetProdutoIdRequest): Observable<ProdutoResponse> {
    if (!this.authService.hasUsuario()) {
      return of({} as ProdutoResponse);
    }

    return this.http
      .get(`${this.url}/${request.id}`, {
        headers: {
          "X-HandOven-User": this.usuarioId,
          "X-HandOven-Family": this.familiaId,
        },
      })
      .pipe(map((res: any) => res));
  }

  getProductsByName(
    request: GetProdutoNomeRequest
  ): Observable<ProdutoResponse[]> {
    if (!this.authService.hasUsuario()) {
      return of([] as ProdutoResponse[]);
    }

    return this.http
      .post(`${this.url}/name/familyId/${this.familiaId}`, request, {
        headers: {
          "X-HandOven-User": this.usuarioId,
          "X-HandOven-Family": this.familiaId,
        },
      })
      .pipe(map((res: any) => res));
  }

  postProduct(request: ProdutoRequest): Observable<ProdutoResponse[]> {
    if (!this.authService.hasUsuario()) {
      return of([] as ProdutoResponse[]);
    }

    return this.http
      .post(this.url, request, {
        headers: {
          "X-HandOven-User": this.usuarioId,
          "X-HandOven-Family": this.familiaId,
          "X-handOven-Service": "false",
        },
      })
      .pipe(map((res: any) => res));
  }

  putProductById(request: ProdutoRequest): Observable<ProdutoResponse[]> {
    if (!this.authService.hasUsuario()) {
      return of([] as ProdutoResponse[]);
    }

    return this.http
      .put(`${this.url}/${request.id}`, request, {
        headers: {
          "X-HandOven-User": this.usuarioId,
          "X-HandOven-Family": this.familiaId,
        },
      })
      .pipe(map((res: any) => res));
  }

  deletarProdutoById({ id }: DeletarProdutoRequest): Observable<any> {
    if (!this.authService.hasUsuario()) {
      return of([] as ProdutoResponse[]);
    }

    return this.http
      .delete(`${this.url}/${id}`, {
        headers: {
          "X-HandOven-User": this.usuarioId,
          "X-HandOven-Family": this.familiaId,
          "X-handOven-Service": "false",
        },
      })
      .pipe(map((res: any) => res));
  }
}
