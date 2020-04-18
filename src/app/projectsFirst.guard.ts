import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot, RouterStateSnapshot,
	Router
} from "@angular/router";
import { ProjectsComponent } from "./projects/projects.component";
@Injectable()
export class ProjectsFirstGuard {
	private firstNavigation = true;
	constructor(private router: Router) { }
	canActivate(route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean {
		if (this.firstNavigation) {
			this.firstNavigation = false;
			if (route.component != ProjectsComponent) {
				this.router.navigateByUrl("/");
				return false;
			}
		}
		return true;
	}
}