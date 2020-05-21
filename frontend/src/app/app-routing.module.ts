import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageComponent } from "./page/page.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EditorDesignerComponent } from "./creators/editor-designer/editor-designer.component";

const routes: Routes = [
  { path: "editor-designer", component: EditorDesignerComponent },
  { path: "**", redirectTo:"/editor-designer" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
