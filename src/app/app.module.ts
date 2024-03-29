import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { IonicStorageModule } from "@ionic/storage-angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { httpInterceptorProviders } from "./auth/http-interceptor";
import { Network } from "@awesome-cordova-plugins/network/ngx";
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    IonicModule.forRoot({
      innerHTMLTemplatesEnabled: true
    }),
    IonicStorageModule.forRoot(),
  ],
  providers: [
    httpInterceptorProviders,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Network,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
