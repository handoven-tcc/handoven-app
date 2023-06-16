// import {AuthGuard} from './guards';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './auth.component';
import {NgModule} from '@angular/core';
import {LoginComponent} from './pages/login/login.component';
import {CriarContaComponent} from './pages/criar-conta/criar-conta.component';
import {CriarContaInternoComponent} from './pages/criar-conta-interno/criar-conta-interno.component';
import {SucessoComponent} from './pages/sucesso/sucesso.component';
import {EsqueciASenhaComponent} from './pages/esqueci-a-senha/esqueci-a-senha.component';
import {RedefinirSenhaComponent} from './pages/redefinir-senha/redefinir-senha.component';

const routes: Routes = [
    {
        path: '', component: AuthComponent,
        children: [
            {path: '', redirectTo: 'login', pathMatch: 'full'},
            {path: 'login', component: LoginComponent},
            {path: 'criar-conta', component: CriarContaComponent},
            {path: 'criar-conta-interno', component: CriarContaInternoComponent},
            {path: 'sucesso', component: SucessoComponent},
            {path: 'esqueci-a-senha', component: EsqueciASenhaComponent},
            {path: 'redefinir-senha', component: RedefinirSenhaComponent},
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}

