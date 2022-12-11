import { Company } from "app/company/company";
import { Employee } from "app/employee/employee";

export class Message {
   id: number;
   subject:string;
   receiver:Employee;
   sender:Employee;
	body:string;
	referenceId:number;
   company:Company;
	status:string;
   createdDate:string;
   modifiedDate:string;


}
