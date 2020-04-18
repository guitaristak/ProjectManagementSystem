import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { AdminComponent } from "./admin.component";
import { AuthGuard } from "./auth.guard";
import { RecordTableComponent } from "./recordTable.component";
import { RecordEditorComponent } from "./recordEditor.component";
import { StudentTableComponent } from './studentTable.component';
import { StudentFormComponent } from './studentForm.component';
let routing = RouterModule.forChild([
 { path: "auth", component: AuthComponent },
 { 
     path: "main", component: AdminComponent, canActivate: [AuthGuard],
     children: [
        { path: "records/:mode/:id", component: RecordEditorComponent },
        { path: "records/:mode", component: RecordEditorComponent },
				{ path: "records", component: RecordTableComponent },
				{ path: "students/:mode:id", component: StudentFormComponent },
				{ path: "students/:mode", component: StudentFormComponent },
        { path: "students", component: StudentTableComponent },
        { path: "**", redirectTo: "records" }
     ]
    },	
 { path: "**", redirectTo: "auth" }
]);
@NgModule({
    imports: [CommonModule, FormsModule, routing],
    providers: [AuthGuard],
    declarations: [AuthComponent, AdminComponent,RecordTableComponent, RecordEditorComponent, StudentFormComponent, StudentTableComponent]
   })
   export class AdminModule { }