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
// import { StorageService } from "../../../../temp/src/lib/tools/services/storage.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  emptyUserID: string = "111111111111111111111111";
  emptyFamilyID: string = "111111111111111111111111";

  private get url(): string {
    return `${environment.api}`;
  }

  constructor(
    private http: HttpClient,
    // private storage: StorageService,
    private router: Router
  ) {}

  getAuthToken() {
    return window.localStorage.getItem("token") ?? "";
  }

  criarUsuario(request: UsuarioRequest): Observable<UsuarioResponse> {
    if (!request.id || !request.familyId) {
      return of();
    }

    return this.http
      .post(`${this.url}/user/adduser`, request, {
        headers: {
          "X-HandOven-User": this.emptyUserID,
          "X-HandOven-Family": request.familyId,
        },
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

  editarUsuario(request: UsuarioRequest): Observable<UsuarioResponse> {
    if (!request.id || !request.familyId) {
      return of();
    }

    return this.http
      .put(`${this.url}/user/${request.id}`, request, {
        headers: {
          "X-HandOven-Family": request.familyId,
          "X-HandOven-User": request.id,
          "X-handOven-Service": "false",
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

  deletarUsuario(request: DeletarUsuarioRequest): Observable<any> {
    if (!request.id || !request.familyId) {
      return of();
    }

    return this.http
      .delete(`${this.url}/user/${request.id}`, {
        headers: {
          "X-HandOven-User": request.id,
          "X-HandOven-Family": request.familyId,
          "X-handOven-Service": "false",
        },
      })
      .pipe(
        map((res: any) => {
          this.logout();
          return res;
        })
      );
  }

  login(request: LoginRequest): Observable<UsuarioResponse> {
    const familyHeader = window.localStorage.getItem("X-HandOven-Family") ?? "";
    const userHeader = window.localStorage.getItem("X-HandOven-User") ?? "";

    if (familyHeader !== "" && userHeader !== "") {
      this.router.navigate(["/tabs/receitas"]);
      return of();
    }

    return this.http
      .post(`${this.url}/user/login`, request, {
        headers: {
          "X-HandOven-User": this.emptyUserID,
          "X-HandOven-Family": this.emptyFamilyID,
        },
      })
      .pipe(
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
    // this.storage.remove("X-HandOven-Family")
    // this.storage.remove("X-HandOven-User")
    window.localStorage.clear();
  }

  criarFamilia(request: FamiliaRequest): Observable<FamiliaResponse> {
    if (!request.name) {
      return of();
    }

    return this.http.post(`${this.url}/family`, request).pipe(
      map((res: any) => {
        // this.storage.set("X-HandOven-Family", res.id);
        window.localStorage.setItem("X-HandOven-Family", res.id);
        return res;
      })
    );
  }

  deleteAll(request: DeletarUsuarioRequest): Observable<any> {
    if (!request.id || !request.familyId) {
      return of();
    }

    return this.http
      .delete(`${this.url}/family/destroyAll/${request.familyId}`, {
        headers: {
          "X-HandOven-User": request.id,
          "X-HandOven-Family": request.familyId,
          "X-handOven-Service": "true",
        },
      })
      .pipe(
        map((res: any) => {
          this.logout();
          return res;
        })
      );
  }
}
