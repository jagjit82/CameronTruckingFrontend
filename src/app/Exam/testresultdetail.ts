import { Company } from "app/company/company";
import { TestResult } from "./testresult";
import { Question } from "app/question/question";

export class TestResultDetail {
   id: number;
   testResult:TestResult;
   question:Question;
	createdDate:string;
	modifiedDate:string;
   answer:string;
   correct:number;
	

}
