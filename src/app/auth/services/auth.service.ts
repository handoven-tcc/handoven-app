import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private get url(): string {
    return `${environment.api}/user`;
  }

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${this.url}/login`, { email, senha }).pipe(
      map(async (res) => {
        // TODO: Guardar info de usuario logado e manter a info viva na aplicação
        // Se atentar com lifecycle de componentes (ngOnDestroy)
        return res;
      })
    );
  }

  // createUser(name: string, birthDate: string, cell: string, email: string, password: string, familyId: string): Observable<any>{
  //   return this.http.post(`${this.url}/`, {name, birthDate, cell, email, password, familyId})
  // }

  // createFamilyUser(name: string, birthDate: string, cell: string, email: string, password: string, familyId: string): Observable<any>{
  //   return this.http.post(`${this.url}/addUser`, {name, birthDate, cell, email, password, familyId})
  // }
}
