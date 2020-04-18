import { Component } from "@angular/core";
import { RecordRepository } from "../model/record.repository";
import { Student } from '../model/student.model';
import { StudentRepository } from '../model/student.repository';
@Component({
	templateUrl: "studentTable.component.html"
})
export class StudentTableComponent {
	constructor(private repository: StudentRepository, private recordRepo: RecordRepository) { }
	getStudents(): Student[] {
		return this.repository.getStudents();
	}
	deleteRecord(id: number, name: string) {
		if (confirm(`Do you want to delete ${name}?`)) {
			this.repository.deleteStudent(id);
		}
	}
	isAllowToDelete(rollNumber: number) {
		return this.recordRepo.isStudentAlloted(rollNumber);
	}
}