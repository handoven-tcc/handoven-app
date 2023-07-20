import { NgModule } from "@angular/core";
import { ComponentsModule } from "./components/components.module";
import { ToolsModule } from "./tools/tools.module";

@NgModule({
  declarations: [],
  imports: [ComponentsModule, ToolsModule],
  exports: [ComponentsModule, ToolsModule],
})
export class TempModule {}
