import { IonicModule } from "@ionic/angular";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ReceitasComponent } from "./receitas.component";

import { ReceitasPageRoutingModule } from "./receitas-routing.module";
import { ComponentsModule } from "../../../temp/src/lib/components/components.module";
import { ListarCategoriaReceitaComponent } from "./pages/listar-categoria-receitas/listar-categoria-receita.component";
import { ListarReceitasComponent } from "./pages/listar-receitas/listar-receitas.component";
import { DetalhesDaReceitaComponent } from "./pages/detalhes-da-receita/detalhes-da-receita.component";
import { HideHeaderDirective } from './directives/hide-header.directive';

@NgModule({
  imports: [
    ComponentsModule,
    IonicModule,
    ComponentsModule,
    CommonModule,
    FormsModule,
    ReceitasPageRoutingModule,
  ],
  declarations: [
    ReceitasComponent,
    ListarReceitasComponent,
    ListarCategoriaReceitaComponent,
    DetalhesDaReceitaComponent,
    HideHeaderDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReceitasPageModule {}
