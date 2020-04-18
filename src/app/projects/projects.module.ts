import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ModelModule } from "../model/model.module";
import { ProjectsComponent } from "./projects.component";
import { RouterModule } from "@angular/router";

@NgModule({
 imports: [ModelModule, BrowserModule, FormsModule, RouterModule],
 declarations: [ProjectsComponent],
 exports: [ProjectsComponent]
})
export class ProjectsModule { }