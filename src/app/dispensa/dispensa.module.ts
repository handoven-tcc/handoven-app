import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DispensaPage } from "./dispensa.page";

import { DispensaPageRoutingModule } from "./dispensa-routing.module";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, DispensaPageRoutingModule],
  declarations: [DispensaPage],
})
export class DispensaPageModule {}
