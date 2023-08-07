import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PerfilComponent } from "./perfil.component";

import { PerfilRoutingModule } from "./perfil-routing.module";
import { AdicionarIntegranteComponent } from "./pages/adicionar-integrante/adicionar-integrante.component";
import { EditarPerfilComponent } from "./pages/editar-perfil/editar-perfil.component";
import { ComponentsModule } from "../../../temp/src/lib/components/components.module";
import { ListarPerfilComponent } from "./pages/listar-perfil/listar-perfil.component";

@NgModule({
  imports: [
    IonicModule,
    ComponentsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PerfilRoutingModule,
  ],
  declarations: [
    PerfilComponent,
    AdicionarIntegranteComponent,
    EditarPerfilComponent,
    ListarPerfilComponent,
  ],
})
export class PerfilPageModule {}
