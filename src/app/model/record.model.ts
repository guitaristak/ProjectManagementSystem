import { Student } from './student.model';

export class Record {
    constructor(
    public id?: number,
    public name?: string,
    public branch: string = '',
    public techused?: string,
    public studentsAlloted: number[] = [],
    public status: string = '') { }
   }