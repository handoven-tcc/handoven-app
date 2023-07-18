import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./pages/login/login.component";
import { CriarContaComponent } from "./pages/criar-conta/criar-conta.component";
import { CriarContaInternoComponent } from "./pages/criar-conta-interno/criar-conta-interno.component";
import { EsqueciASenhaComponent } from "./pages/esqueci-a-senha/esqueci-a-senha.component";
import { RedefinirSenhaComponent } from "./pages/redefinir-senha/redefinir-senha.component";
import { SucessoComponent } from "./pages/sucesso/sucesso.component";

@NgModule({
  imports: [IonicModule, CommonModule, AuthRoutingModule],
  declarations: [
    AuthComponent,
    CriarContaComponent,
    CriarContaInternoComponent,
    EsqueciASenhaComponent,
    LoginComponent,
    RedefinirSenhaComponent,
    SucessoComponent,
  ],
})
export class AuthModule {}
