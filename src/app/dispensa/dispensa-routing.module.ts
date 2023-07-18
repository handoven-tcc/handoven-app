import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DispensaPage } from "./dispensa.page";

const routes: Routes = [
  {
    path: "",
    component: DispensaPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DispensaPageRoutingModule {}
