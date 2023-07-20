import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReceitasComponent } from "./receitas.component";
import { ListarReceitasComponent } from "./pages/listar-receitas/listar-receitas.component";
import { ListarReceitaInternoComponent } from "./pages/listar-receita-interno/listar-receita-interno.component";
import { DetalhesDaReceitaComponent } from "./pages/detalhes-da-receita/detalhes-da-receita.component";
import { AuthGuard } from "../auth/guard/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: ReceitasComponent,
    children: [
      { path: "", component: ListarReceitasComponent },
      {
        path: "ver-mais/:categoriaId",
        component: ListarReceitaInternoComponent,
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
