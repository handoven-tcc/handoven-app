import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReceitasComponent } from "./receitas.component";
import { ListarReceitasComponent } from "./pages/listar-receitas/listar-receitas.component";
import { ListarCategoriaReceitaComponent } from "./pages/listar-categoria-receitas/listar-categoria-receita.component";
import { DetalhesDaReceitaComponent } from "./pages/detalhes-da-receita/detalhes-da-receita.component";
import { AuthGuard } from "../auth/guard/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: ReceitasComponent,
    children: [
      { path: "", component: ListarReceitasComponent },
      {
        path: "ver-mais/:categoria",
        component: ListarCategoriaReceitaComponent,
      },
      { path: "detalhes/:receitaId", component: DetalhesDaReceitaComponent },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceitasPageRoutingModule {}
