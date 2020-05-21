import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DataService, UrlBuilderService } from "../services";
import { PageComponent } from "./page/page.component";
import { AppPostDirective } from "./app-post.directive";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavigationComponent } from "./navigation/navigation.component";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { EditorDesignerComponent } from "./creators/editor-designer/editor-designer.component";
import { JsonViewerComponent } from "./creators/json-viewer/json-viewer.component";
import { NgxJsonViewerModule } from "ngx-json-viewer";
import { InputContentTypeComponent } from "./creators/input-content-type/input-content-type.component";
import { ContentTypesComponent } from "./creators/content-types/content-types.component";
import { HttpClientModule } from "@angular/common/http";
@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    AppPostDirective,
    NavigationComponent,
    DashboardComponent,
    EditorDesignerComponent,
    JsonViewerComponent,
    InputContentTypeComponent,
    ContentTypesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    NgxJsonViewerModule,
  ],
  providers: [UrlBuilderService, DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
