import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./auth-interceptor";
import { InternetInterceptor } from "./internet-interceptor";
import { ServerInterceptor } from "./server-interceptor";
import { ClientInterceptor } from "./client-interceptor";
import { DEFAULT_TIMEOUT, TimeoutInterceptor } from "./timeout-interceptor";

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InternetInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ServerInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ClientInterceptor,
    multi: true,
  },
  { provide: HTTP_INTERCEPTORS,
    useClass: TimeoutInterceptor, 
    multi: true 
  },
  { provide: DEFAULT_TIMEOUT, useValue: 60000 },
];
