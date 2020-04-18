import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Record } from "../model/record.model";
import { RecordRepository } from "../model/record.repository";
import { StudentRepository } from '../model/student.repository';
import { Student } from '../model/student.model';
@Component({
	templateUrl: "recordEditor.component.html"
})
export class RecordEditorComponent {
	editing: boolean = false;
	record: Record = new Record();
	allotedStudent: number[] = [];
	errorMessage: string = null;
	constructor(private repository: RecordRepository, private studentRepo: StudentRepository,
		private router: Router,
		activeRoute: ActivatedRoute) {
		this.editing = activeRoute.snapshot.params["mode"] == "edit";
		let projectList = repository.getRecords();
		if (this.editing) {
			Object.assign(this.record,
				repository.getRecord(activeRoute.snapshot.params["id"]));
				projectList = projectList.filter(item => item.id !== this.record.id);
		}
		projectList.forEach(item => {
			this.allotedStudent = this.allotedStudent.concat(item.studentsAlloted);
		});
	}
	save(form: NgForm) {
		if (this.record.studentsAlloted.length > 1 && this.record.studentsAlloted.length < 5) {
			if (form.valid) {
				if (this.editing || !this.repository.isRecordExist(this.record.name)) {
					this.repository.saveRecord(this.record);
					this.router.navigateByUrl("/admin/main/records");
				} else {
					this.errorMessage = "Project already exist, please use different project name.";
					setTimeout(() => {
						this.errorMessage = null;
					}, 4000)
				}
			}
		}
	}
	getStudents(): Student[] {
		return this.studentRepo.getStudents().filter(item => this.allotedStudent.indexOf(item.rollNumber) === -1);
	}
}