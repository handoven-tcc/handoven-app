import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DispensaComponent } from "./dispensa.component";

import { DispensaPageRoutingModule } from "./dispensa-routing.module";
import { ComponentsModule } from "../../../temp/src/lib/components/components.module";
import { ListarDispensaComponent } from "./pages/listar-dispensa/listar-dispensa.component";
import { AdicionarDispensaComponent } from "./pages/adicionar-dispensa/adicionar-dispensa.component";
import { EditarDispensaComponent } from "./pages/editar-dispensa/editar-dispensa.component";

@NgModule({
  imports: [
    IonicModule,
    ComponentsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DispensaPageRoutingModule,
  ],
  declarations: [
    DispensaComponent,
    ListarDispensaComponent,
    AdicionarDispensaComponent,
    EditarDispensaComponent,
  ],
})
export class DispensaPageModule {}
