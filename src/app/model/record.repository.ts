import { Injectable } from "@angular/core";
import { Record } from "./record.model";
import { RestDataSource } from "./rest.datasource";
@Injectable()
export class RecordRepository {
	private records: Record[] = [];
	private branches: string[] = [];
	constructor(private dataSource: RestDataSource) {
		dataSource.getRecords().subscribe(data => {
			this.records = data;
		});
	}
	getRecords(branch: string = null): Record[] {
		return this.records
			.filter(p => branch == null || branch == p.branch);
	}
	getRecord(id: number): Record {
		return this.records.find(p => p.id == id);
	}
	isRecordExist(name: string): boolean {
		return !!this.records.find(p => p.name == name);
	}
	getBranches(): string[] {
		return this.getRecords().map(p => p.branch)
		.filter((c, index, array) => array.indexOf(c) == index).sort();;
	}
	saveRecord(record: Record) {
		if (record.id == null || record.id == 0) {
			this.dataSource.saveRecord(record)
				.subscribe(p => this.records.push(p));
		} else {
			this.dataSource.updateRecord(record)
				.subscribe(p => {
					this.records.splice(this.records.
						findIndex(p => p.id == record.id), 1, record);
				});
		}
	}
	deleteRecord(id: number) {
		this.dataSource.deleteRecord(id).subscribe(p => {
			this.records.splice(this.records.
				findIndex(p => p.id == id), 1);
		})
	}

	isStudentAlloted(rollNumber: number) {
		return this.records.filter(p => p.studentsAlloted.indexOf(rollNumber) !== -1).length !== 0;
	}
}