import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProjectsModule } from "./projects/projects.module";
import { ProjectsComponent } from "./projects/projects.component";
import { RouterModule } from "@angular/router";
import { ProjectsFirstGuard } from "./projectsFirst.guard";
@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, ProjectsModule, RouterModule.forRoot([
		{
			path: "projects", component: ProjectsComponent,
			canActivate: [ProjectsFirstGuard]
		},
		{
			path: "admin",
			loadChildren: "./admin/admin.module#AdminModule",
			canActivate: [ProjectsFirstGuard]
		},
		{ path: "**", redirectTo: "/projects" }
	])],
	providers: [ProjectsFirstGuard],
	bootstrap: [AppComponent]
})
export class AppModule { }