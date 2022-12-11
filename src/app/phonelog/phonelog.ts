import { Company } from "app/company/company";
import { Vehicle } from "app/vehicle/vehicle";
import { Instructor } from "app/instructor/instructor";

export class PhoneLog {
   id: number;
   callDate:string;
   callTime:string;
   callerType:string
	phoneNo:string;
	name:string;
   reason:string;
   comments:string;
   company:Company;
	status:string;
   createdDate:string;
   modifiedDate:string;


}
