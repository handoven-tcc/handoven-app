import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./pages/login/login.component";
import { CriarContaComponent } from "./pages/criar-conta/criar-conta.component";
import { CriarContaInternoComponent } from "./pages/criar-conta-interno/criar-conta-interno.component";
import { EsqueciASenhaComponent } from "./pages/esqueci-a-senha/esqueci-a-senha.component";
import { RedefinirSenhaComponent } from "./pages/redefinir-senha/redefinir-senha.component";
import { SucessoComponent } from "./pages/sucesso/sucesso.component";
import { HomeComponent } from "./pages/home/home.component";
import { ComponentsModule } from "../../../temp/src/lib/components/components.module";

@NgModule({
  imports: [
    IonicModule,
    ComponentsModule,
    CommonModule,
    AuthRoutingModule,
    FormsModule,
  ],
  declarations: [
    AuthComponent,
    CriarContaComponent,
    CriarContaInternoComponent,
    EsqueciASenhaComponent,
    HomeComponent,
    LoginComponent,
    RedefinirSenhaComponent,
    SucessoComponent,
  ],
})
export class AuthModule {}
