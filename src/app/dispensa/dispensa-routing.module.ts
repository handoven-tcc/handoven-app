import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DispensaComponent } from "./dispensa.component";
import { AuthGuard } from "../auth/guard/auth.guard";
import { ListarDispensaComponent } from "./pages/listar-dispensa/listar-dispensa.component";
import { AdicionarDispensaComponent } from "./pages/adicionar-dispensa/adicionar-dispensa.component";

const routes: Routes = [
  {
    path: "",
    component: DispensaComponent,
    children: [
      { path: "", component: ListarDispensaComponent },
      { path: "adicionar-produto", component: AdicionarDispensaComponent },
      // { path: "editar/:dispensaId", component: EditarDispensaComponent },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DispensaPageRoutingModule {}
