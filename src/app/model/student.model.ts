import { Injectable } from "@angular/core";

@Injectable()
export class Student {
	public id?: number;
	public rollNumber?: number;
	public name?: string;
	public branch: string = '';
	public allotted?: boolean;
}