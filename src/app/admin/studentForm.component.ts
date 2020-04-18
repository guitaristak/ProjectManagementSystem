import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { StudentRepository } from '../model/student.repository';
import { Student } from '../model/student.model';
@Component({
	templateUrl: "studentForm.component.html",
	styleUrls: ["studentForm.component.css"]
})
export class StudentFormComponent {
	editing: boolean = false;
	student: Student = new Student();
	errorMessage: string = null;
	constructor(private repository: StudentRepository,
		private router: Router,
		activeRoute: ActivatedRoute) {
		this.editing = activeRoute.snapshot.params["mode"] == "edit";
		if (this.editing) {
			Object.assign(this.student,
				repository.getStudent(activeRoute.snapshot.params["id"]));
		}
	}
	save(form: NgForm) {
		if (form.valid) {
			if(this.editing || !this.repository.getStudentByRollNo(this.student.rollNumber)) {
				this.repository.saveStudent(this.student);
				this.router.navigateByUrl("/admin/main/students");
			} else {
				this.errorMessage = 'This student roll number already exist';
				setTimeout(() => {
					this.errorMessage = null;
				}, 4000);
			}
		}
	}
}