import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PerfilComponent } from "./perfil.component";
import { AdicionarIntegranteComponent } from "./pages/adicionar-integrante/adicionar-integrante.component";
import { EditarPerfilComponent } from "./pages/editar-perfil/editar-perfil.component";
import { AuthGuard } from "../auth/guard/auth.guard";
import { ListarPerfilComponent } from "./pages/listar-perfil/listar-perfil.component";

const routes: Routes = [
  {
    path: "",
    component: PerfilComponent,
    children: [
      { path: "", component: ListarPerfilComponent },
      { path: "adicionar-integrante", component: AdicionarIntegranteComponent },
      { path: "editar-perfil", component: EditarPerfilComponent },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilRoutingModule {}
