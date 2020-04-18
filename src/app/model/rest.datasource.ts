import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Record } from "./record.model";
import { Student } from "./student.model";
import { map } from "rxjs/operators";
import { HttpHeaders } from '@angular/common/http';

const PROTOCOL = "http";
const PORT = 3500;
@Injectable()
export class RestDataSource {
	baseUrl: string;
	auth_token: string;
	constructor(private http: HttpClient) {
		this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
	}
	authenticate(user: string, pass: string): Observable<boolean> {
		return this.http.post<any>(this.baseUrl + "login", {
			name: user, password: pass
		}).pipe(map(response => {
			this.auth_token = response.success ? response.token : null;
			return response.success;
		}));
	}
	getRecords(): Observable<Record[]> {
		return this.http.get<Record[]>(this.baseUrl + "records");
	}
	saveRecord(record: Record): Observable<Record> {
		return this.http.post<Record>(this.baseUrl + "records",
			record, this.getOptions());
	}
	updateRecord(record): Observable<Record> {
		return this.http.put<Record>(`${this.baseUrl}records/${record.id}`,
			record, this.getOptions());
	}
	deleteRecord(id: number): Observable<Record> {
		return this.http.delete<Record>(`${this.baseUrl}records/${id}`,
			this.getOptions());
	}
	getStudents(): Observable<Student[]> {
		return this.http.get<Student[]>(this.baseUrl + "students",
			this.getOptions());
	}
	saveStudent(student: Student): Observable<Student> {
		return this.http.post<Student>(this.baseUrl + "students", student,
			this.getOptions());
	}
	deleteStudent(id: number): Observable<Student> {
		return this.http.delete<Student>(`${this.baseUrl}students/${id}`,
			this.getOptions());
	}
	updateStudent(student: Student): Observable<Student> {
		return this.http.put<Student>(`${this.baseUrl}students/${student.id}`,
			this.getOptions());
	}
	private getOptions() {
		return {
			headers: new HttpHeaders({
				"Authorization": `Bearer<${this.auth_token}>`
			})
		}
	}
}