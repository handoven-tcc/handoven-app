import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FavoritosPage } from "./favoritos.page";
import { AuthGuard } from "../auth/guard/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: FavoritosPage,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritosPageRoutingModule {}
