import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FavoritosPage } from "./favoritos.page";

import { FavoritosPageRoutingModule } from "./favoritos-routing.module";
import { ComponentsModule } from "../../../temp/src/lib/components/components.module";

@NgModule({
  imports: [
    IonicModule,
    ComponentsModule,
    CommonModule,
    FormsModule,
    FavoritosPageRoutingModule,
  ],
  declarations: [FavoritosPage],
})
export class FavoritosPageModule {}
