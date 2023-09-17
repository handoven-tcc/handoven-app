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
export class ServerInterceptor implements HttpInterceptor {
  constructor(public alertController: AlertController) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 500) {
          this.alertController
            .create({
              header: "Internet Server Error!",
              message: "Servidor não conectado.",
            })
            .then((o) => o.present());
        }

        // if (!error.status) {
        //   this.alertController
        //     .create({
        //       header: "Network Error!",
        //       message:
        //         "Conexão com o servidor foi recusada, tente novamente mais tarde.",
        //     })
        //     .then((o) => o.present());
        // }

        return throwError(error);
      })
    );
  }
}
