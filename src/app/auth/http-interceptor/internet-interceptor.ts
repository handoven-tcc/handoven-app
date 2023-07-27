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
import { Network } from "@awesome-cordova-plugins/network/ngx";
import { AlertController } from "@ionic/angular";

@Injectable({ providedIn: "root" })
export class InternetInterceptor implements HttpInterceptor {
  constructor(
    private network: Network,
    public alertController: AlertController
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!navigator.onLine || this.network.type === "none") {
          this.alertController
            .create({
              header: "Sem conexão com a internet!",
              message: "Verifique sua conexão e tente novamente.",
            })
            .then((o) => o.present());
        }
        return throwError(error);
      })
    );
  }
}
