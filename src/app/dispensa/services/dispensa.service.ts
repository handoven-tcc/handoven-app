import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable, map } from "rxjs";
import {
  ProductRequest,
  DeleteProductRequest,
  GetProductByNameRequest,
  GetProductByIdRequest,
  GetAllProductsRequest,
  ProductsResponse,
} from "../models";

@Injectable({
  providedIn: "root",
})
export class DispensaService {
  private get url(): string {
    return `${environment.api}/products`;
  }

  constructor(private http: HttpClient) // private storage: StorageService,
  {}

  getAllProducts(
    request: GetAllProductsRequest
  ): Observable<ProductsResponse[]> {
    return this.http
      .get(this.url, {
        headers: {
          "X-HandOven-User": request.usuarioId,
          "X-HandOven-Family": request.familiaId,
        },
      })
      .pipe(map((res: any) => res));
  }

  getProductById(request: GetProductByIdRequest): Observable<ProductsResponse> {
    return this.http
      .get(`${this.url}/${request.id}`, {
        headers: {
          "X-HandOven-User": request.usuarioId,
          "X-HandOven-Family": request.familiaId,
        },
      })
      .pipe(map((res: any) => res));
  }

  getProductsByName(
    request: GetProductByNameRequest
  ): Observable<ProductsResponse[]> {
    return this.http
      .post(`${this.url}/name/familyId/${request.familiaId}`, request, {
        headers: {
          "X-HandOven-User": request.usuarioId,
          "X-HandOven-Family": request.familiaId,
        },
      })
      .pipe(map((res: any) => res));
  }

  postProduct(request: ProductRequest): Observable<ProductsResponse[]> {
    return this.http
      .post(this.url, request, {
        headers: {
          "X-HandOven-User": request.usuarioId,
          "X-HandOven-Family": request.familiaId,
          "X-handOven-Service": "false",
        },
      })
      .pipe(map((res: any) => res));
  }

  putProductById(request: ProductRequest): Observable<ProductsResponse[]> {
    return this.http
      .put(`${this.url}/${request.id}`, request, {
        headers: {
          "X-HandOven-User": request.usuarioId,
          "X-HandOven-Family": request.familiaId,
        },
      })
      .pipe(map((res: any) => res));
  }

  deleteProductById(request: DeleteProductRequest): Observable<any> {
    return this.http
      .delete(`${this.url}/${request.id}`, {
        headers: {
          "X-HandOven-User": request.usuarioId,
          "X-HandOven-Family": request.familiaId,
          "X-handOven-Service": "false",
        },
      })
      .pipe(map((res: any) => res));
  }
}
