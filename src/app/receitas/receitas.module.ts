import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ReceitasComponent } from "./receitas.component";

import { ReceitasPageRoutingModule } from "./receitas-routing.module";
import { ComponentsModule } from "../../../temp/src/lib/components/components.module";
import { ListarReceitaInternoComponent } from "./pages/listar-receita-interno/listar-receita-interno.component";
import { ListarReceitasComponent } from "./pages/listar-receitas/listar-receitas.component";
import { DetalhesDaReceitaComponent } from "./pages/detalhes-da-receita/detalhes-da-receita.component";

@NgModule({
  imports: [
    ComponentsModule,
    IonicModule,
    CommonModule,
    FormsModule,
    ReceitasPageRoutingModule,
  ],
  declarations: [
    ReceitasComponent,
    ListarReceitasComponent,
    ListarReceitaInternoComponent,
    DetalhesDaReceitaComponent,
  ],
})
export class ReceitasPageModule {}
