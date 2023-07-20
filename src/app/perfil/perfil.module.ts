import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PerfilComponent } from "./perfil.component";

import { PerfilRoutingModule } from "./perfil-routing.module";
import { AdicionarIntegranteComponent } from "./pages/adicionar-integrante/adicionar-integrante.component";
import { EditarPerfilComponent } from "./pages/editar-perfil/editar-perfil.component";
import { PerfilInternoComponent } from "./pages/perfil-interno/perfil-interno.component";
import { ComponentsModule } from "../../../temp/src/lib/components/components.module";

@NgModule({
  imports: [
    IonicModule,
    ComponentsModule,
    CommonModule,
    FormsModule,
    PerfilRoutingModule,
  ],
  declarations: [
    PerfilComponent,
    AdicionarIntegranteComponent,
    EditarPerfilComponent,
    PerfilInternoComponent,
  ],
})
export class PerfilPageModule {}
