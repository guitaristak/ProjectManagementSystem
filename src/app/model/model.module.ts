import { NgModule } from "@angular/core";
import { RecordRepository } from "./record.repository";
import { StaticDataSource } from "./static.datasource";
import { Student } from "./student.model";
import { StudentRepository } from "./student.repository";
import { RestDataSource } from "./rest.datasource";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "./auth.service";
@NgModule({
    imports: [HttpClientModule],
 providers: [RecordRepository, Student, StudentRepository, {provide :StaticDataSource, useClass:RestDataSource},RestDataSource, AuthService]
})
export class ModelModule { }