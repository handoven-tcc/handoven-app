import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FavoritosComponent } from "./favoritos.component";
import { FavoritosRoutingModule } from "./favoritos-routing.module";
import { ComponentsModule } from "../../../temp/src/lib/components/components.module";
import { ListarFavoritosComponent } from "./pages/listar-favoritos/listar-favoritos.component";

@NgModule({
  imports: [
    IonicModule,
    ComponentsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FavoritosRoutingModule,
  ],
  declarations: [
    FavoritosComponent,
    ListarFavoritosComponent
  ],
})
export class FavoritosModule {}
