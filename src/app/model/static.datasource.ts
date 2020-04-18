import { Injectable } from "@angular/core";
import { Record } from "./record.model";
import { Observable, from } from "rxjs";
import { Student } from "./student.model"
@Injectable()
export class StaticDataSource {
	private records: Record[] = [];
	private students: Student[] = [];
	getRecords(): Observable<Record[]> {
		return from([this.records]);
	 } 
	getStudents(): Observable<Student[]> {
		return from([this.students]);
 	}  
}