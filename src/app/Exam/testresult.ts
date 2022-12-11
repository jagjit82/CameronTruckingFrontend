import { Company } from "app/company/company";
import { Student } from "app/student/student";
import { Test } from "app/Test/test";

export class TestResult {
   id: number;
   test:Test ;
   student:Student;
   questionCount:number; 
}
