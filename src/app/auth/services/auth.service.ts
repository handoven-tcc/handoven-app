import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable, map } from "rxjs";
import {
  FamiliaRequest,
  FamiliaResponse,
  LoginRequest,
  UsuarioRequest,
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
        // this.storage.set("token", "token");
        // this.storage.set("X-HandOven-Family", res.id);
        window.localStorage.setItem("token", "token");
        window.localStorage.setItem("X-HandOven-Family", res.id);
        return res;
      })
    );
  }

  // login(request: LoginRequest): Observable<any> {
  //   return this.http.post(`${this.url}/login`, request).pipe(
  //     map(async (res) => {
  //       console.log(res);
  //       return res;
  //     })
  //   );
  // }

  // criarUsuario(request: UsuarioRequest): Observable<any> {
  //   return this.http.post(`${this.url}/adduser`, request).pipe(
  //     map(async (res) => {
  //       console.log(res);

  //       this.storage.set("login", "logado:D");
  //       this.storage.set("X-HandOven-Service", "true");
  //       this.storage.set("X-HandOven-User", "sla");
  //       this.storage.set("X-HandOven-Family", "sla2");

  //       return res;
  //     })
  //   );
  // }
}
