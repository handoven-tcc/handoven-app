import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DispensaPage } from "./dispensa.page";
import { AuthGuard } from "../auth/guard/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: DispensaPage,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DispensaPageRoutingModule {}
