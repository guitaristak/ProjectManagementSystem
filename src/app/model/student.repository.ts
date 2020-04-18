import { Injectable } from "@angular/core";
import { Student } from "./student.model";
import { RestDataSource } from "./rest.datasource";
import { RecordRepository } from './record.repository';

@Injectable()
export class StudentRepository {
   private students: Student[] = [];
   private loaded: boolean = false;
   constructor(private dataSource: RestDataSource, private recordRepo: RecordRepository) { }
   loadStudents() {
      this.loaded = true;
      this.dataSource.getStudents()
         .subscribe(students => this.students = students);
   }
   getStudents(): Student[] {
      if (!this.loaded) {
         this.loadStudents();
      }
      return this.students;
	 }
	 getStudent(id:number): Student {
		return this.students.find(p => p.id == id);
	 }
	 getStudentByRollNo(rollNumber:number): Student {
		this.getStudents();
		return this.students.find(p => p.rollNumber == rollNumber);
	 }
	//  getUnallotedUser(): Student[] {
	// 	const allRecord = this.recordRepo.getRecords().map();
	// 	return null;
	//  }

   saveStudent(student: Student) {
		if (student.id == null || student.id == 0) {
			this.dataSource.saveStudent(student)
				.subscribe(p => this.students.push(p));
		} else {
			this.dataSource.updateStudent(student)
				.subscribe(p => {
					this.students.splice(this.students.
						findIndex(p => p.id == student.id), 1, student);
				});
		}
   }
   updateStudent(student: Student) {
      this.dataSource.updateStudent(student).subscribe(student => {
         this.students.splice(this.students.
            findIndex(o => o.id == student.id), 1, student);
      });
   }
   deleteStudent(id: number) {
      this.dataSource.deleteStudent(id).subscribe(student => {
         this.students.splice(this.students.findIndex(o => id == o.id));
      });
   }
}