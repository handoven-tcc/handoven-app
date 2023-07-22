import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { AuthService } from "../services";
import { catchError, throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

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
      console.error("Ocorreu um erro", error.error.message);
    } else {
      console.error(
        `Código do erro ${error.status}, ` +
          `Erro: ${JSON.stringify(error.error)}`
      );
    }

    return throwError("Ocorreu um erro, tente novamente");
  }
}
