import { Component } from "@angular/core";
import { Record } from "../model/record.model";
import { RecordRepository } from "../model/record.repository";
import { StudentRepository } from '../model/student.repository';
@Component({
	templateUrl: "recordTable.component.html"
})
export class RecordTableComponent {
	constructor(private repository: RecordRepository, private studentRepo: StudentRepository) {
		
	}
	getRecords(): Record[] {
		return this.repository.getRecords();
	}
	deleteRecord(id: number, projectName: string) {
		if (confirm(`Do you want to delete ${projectName}?`)) {
			this.repository.deleteRecord(id);
		}
	}
	getStudentByRollNumber(rollNumber: number) {
		return this.studentRepo.getStudentByRollNo(rollNumber);
	}
}