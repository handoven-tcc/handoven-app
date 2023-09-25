import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FavoritosComponent } from "./favoritos.component";
import { AuthGuard } from "../auth/guard/auth.guard";
import { ListarFavoritosComponent } from "./pages/listar-favoritos/listar-favoritos.component";

const routes: Routes = [
  {
    path: "",
    component: FavoritosComponent,
    children: [
      { path: "", component: ListarFavoritosComponent },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritosRoutingModule {
}
