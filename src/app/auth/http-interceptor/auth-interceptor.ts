import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { AuthService } from "../services";
import { catchError, throwError } from "rxjs";
import { AlertController } from "@ionic/angular";

@Injectable({ providedIn: "root" })
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    public alertController: AlertController
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getAuthToken();

    let request: HttpRequest<any> = req;

    if (token) {
      request = req.clone({
        headers: req.headers.set("token", token),
      });
    }

    return next.handle(request).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      this.alertController
        .create({
          header: "Erro na Autentificação!",
          message: "Favor verifique suas credenciais.",
        })
        .then((o) => o.present());

      console.error(error.error.message);
    }

    if (error.status == 401) {
      this.alertController
        .create({
          header: "Sem Autentificação!",
          message: "Para efetuar essa ação é necessário autentificação",
        })
        .then((o) => o.present());

      console.error(error.error.message);
    }
    return throwError(error);
  }
}
