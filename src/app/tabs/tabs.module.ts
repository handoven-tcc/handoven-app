import { LOCALE_ID, NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { TabsPageRoutingModule } from "./tabs-routing.module";

import { TabsPage } from "./tabs.page";
import { ComponentsModule } from "../../../temp/src/lib/components/components.module";

@NgModule({
  imports: [
    IonicModule,
    ComponentsModule,
    IonicModule.forRoot(),
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: "pt" }],
  declarations: [TabsPage],
})
export class TabsPageModule {}
