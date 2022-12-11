import { Company } from "app/company/company";

export class ActivityLog {
   id: number;
   activityDate:string;
   category:string;
   reportedBy:string
	activity:string;
	comments:string;
   company:Company;
	status:string;
   createdDate:string;
   modifiedDate:string;


}
