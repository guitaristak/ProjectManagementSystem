import { Component, OnInit } from "@angular/core";
import { Record } from "../model/record.model";
import { RecordRepository } from "../model/record.repository";
import { Router } from "@angular/router";
import { StudentRepository } from '../model/student.repository';
import { Student } from '../model/student.model';
import { $ } from 'protractor';
@Component({
	selector: "projects",
	templateUrl: "projects.component.html",
})


export class ProjectsComponent {

	// ngOnInit() {
	// 	$.getScript('src/assets/js/main.js');
	// }
	public selectedBranch = null;
	public selectedProject = null;
	constructor (private repository: RecordRepository, private router: Router, private studentRepo: StudentRepository) {
		
	}
	get records(): Record[] {
		return this.repository.getRecords(this.selectedBranch);
	}
	changeBranch(newBranch?: string) {
		this.selectedBranch = newBranch;
	}
	getStudentByRollNumber(rollNumber: number): Student {
		return this.studentRepo.getStudentByRollNo(rollNumber);
	}

	changeSelectedProject(projectId?: string){
		if (this.selectedProject == projectId) {
			this.selectedProject = null;
		} else {
			this.selectedProject = projectId;
		}
	}
}

