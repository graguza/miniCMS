import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageComponent } from "./page/page.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EditorDesignerComponent } from "./creators/editor-designer/editor-designer.component";
import { ListViewerComponent } from "./viewers/list-viewer/list-viewer.component";
import { ListEditorComponent } from "./viewers/list-editor/list-editor.component";
import { ListsComponent } from './creators/lists/lists.component';

const routes: Routes = [
  { path: "editor-designer", component: EditorDesignerComponent },
  { path: "lists", component: ListsComponent },
  { path: "list/:id", component: ListViewerComponent },
  { path: "list/:id/list-editor", component: ListEditorComponent },
  { path: "list/:id/list-editor/:itemId", component: ListEditorComponent },
  { path: "list/:id/editor-designer", component: EditorDesignerComponent },
  { path: "**", component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
