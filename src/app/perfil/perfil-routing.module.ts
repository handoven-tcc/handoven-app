import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PerfilComponent } from "./perfil.component";
import { AdicionarIntegranteComponent } from "./pages/adicionar-integrante/adicionar-integrante.component";
import { EditarPerfilComponent } from "./pages/editar-perfil/editar-perfil.component";
import { PerfilInternoComponent } from "./pages/perfil-interno/perfil-interno.component";
import { AuthGuard } from "../auth/guard/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: PerfilComponent,
    children: [
      { path: "", component: PerfilInternoComponent },
      { path: "adicionar-integrante", component: AdicionarIntegranteComponent },
      { path: "editar-perfil/:perfilId", component: EditarPerfilComponent },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilRoutingModule {}
