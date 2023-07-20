import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable, map, of } from "rxjs";
import {
  DeletarUsuarioRequest,
  FamiliaRequest,
  FamiliaResponse,
  GetFamiliaIdRequest,
  LoginRequest,
  UsuarioRequest,
  UsuarioResponse,
} from "../models";
import { StorageService } from "../../../../temp/src/lib/tools/services/storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private get url(): string {
    return `${environment.api}`;
  }

  constructor(private http: HttpClient, private storage: StorageService) {}

  criarFamilia(request: FamiliaRequest): Observable<FamiliaResponse> {
    console.log(request);

    return this.http.post(`${this.url}/family`, request).pipe(
      map((res: any) => {
        // this.storage.set("X-HandOven-Family", res.id);
        window.localStorage.setItem("X-HandOven-Family", res.id);
        return res;
      })
    );
  }

  // TODO: testar criarUsuario
  criarUsuario(request: UsuarioRequest): Observable<UsuarioResponse> {
    const familyHeader = window.localStorage.getItem("X-HandOven-Family");
    if (!familyHeader) {
      return of();
    }

    return this.http
      .post(`${this.url}/user/adduser`, request, {
        headers: { "X-HandOven-Family": familyHeader },
      })
      .pipe(
        map((res: any) => {
          // this.storage.set("token", "token");
          window.localStorage.setItem("token", "token");
          // this.storage.set("X-HandOven-User", res.id);
          window.localStorage.setItem("X-HandOven-User", res.id);
          return res;
        })
      );
  }

  // TODO: testar editarUsuario
  editarUsuario(request: UsuarioRequest): Observable<UsuarioResponse> {
    if (!request.id) {
      return of();
    }

    return this.http
      .put(`${this.url}/user/${request.id}`, request, {
        headers: {
          "X-HandOven-Family": request.familyId,
          "X-HandOven-User": request.id,
        },
      })
      .pipe(
        map((res: any) => {
          // this.storage.set("X-HandOven-Family", res.familyId);
          window.localStorage.setItem("X-HandOven-Family", res.familyId);
          // this.storage.set("X-HandOven-User", res.id);
          window.localStorage.setItem("X-HandOven-User", res.id);
          return res;
        })
      );
  }

  // TODO: testar deletarUsuario
  deletarUsuario(request: DeletarUsuarioRequest): Observable<any> {
    return this.http
      .delete(`${this.url}/user/${request.usuarioId}`, {
        headers: {
          "X-HandOven-User": request.usuarioId,
          "X-HandOven-Family": request.familiaId,
          "X-handOven-Service": "false",
        },
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // TODO: testar login
  login(request: LoginRequest): Observable<UsuarioResponse> {
    const familyHeader = window.localStorage.getItem("X-HandOven-Family");
    const userHeader = window.localStorage.getItem("X-HandOven-User");

    if (!familyHeader || !userHeader) {
      return of();
    }

    return this.http.post(`${this.url}/user/login`, request, {}).pipe(
      map((res: any) => {
        // this.storage.set("token", "token");
        window.localStorage.setItem("token", "token");
        // this.storage.set("X-HandOven-Family", res.familyId);
        window.localStorage.setItem("X-HandOven-Family", res.familyId);
        // this.storage.set("X-HandOven-User", res.id);
        window.localStorage.setItem("X-HandOven-User", res.id);
        return res;
      })
    );
  }

  logout() {
    window.localStorage.clear();
  }

  // TODO: testar getFamiliaId
  getFamiliaId(request: GetFamiliaIdRequest): Observable<FamiliaResponse> {
    return this.http
      .get(`${this.url}/user/familyId/${request.familiaId}`, {
        headers: {
          "X-HandOven-User": request.usuarioId,
          "X-HandOven-Family": request.familiaId,
          "X-handOven-Service": "false",
        },
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
