import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertController } from "@ionic/angular";

@Injectable({ providedIn: "root" })
export class ClientInterceptor implements HttpInterceptor {
  constructor(public alertController: AlertController) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 400) {
          this.alertController
            .create({
              header: "Bad Request!",
              message: "Envio de dados errados.",
            })
            .then((o) => o.present());
        }
        if (error.status == 404) {
          this.alertController
            .create({
              header: "Usuário não encontrado!",
              message:
                "Favor verifique suas credênciais novamente ou crie sua conta",
            })
            .then((o) => o.present());
        }

        return throwError(error);
      })
    );
  }
}
