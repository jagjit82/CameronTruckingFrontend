import { Company } from "app/company/company";
import { Vehicle } from "app/vehicle/vehicle";
import { Instructor } from "app/instructor/instructor";
import { PhoneLog } from "./phonelog";

export class FollowUpPhone {
   id: number;
   followUpDate:string;
	comments:string;
   phoneLog:PhoneLog;
	status:string;
   createdDate:string;
   modifiedDate:string;


}
