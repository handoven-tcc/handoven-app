import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "auth", pathMatch: "full" },
  // { path: "", redirectTo: "tabs", pathMatch: "full" },
  // {
  //   path: "tabs",
  //   loadChildren: () =>
  //     import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  // },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
