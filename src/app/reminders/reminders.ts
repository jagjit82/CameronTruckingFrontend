import { Company } from "app/company/company";

export class Reminders {
   id: number;
	payment:number;
	plateNoExp:number;
	cvipDate:number;
	vehicleInsuranceExpiry:number;
	operatorLicenceExp:number;
	instructorLicenceExp:number;
	licenseExpiry:number;
	businessLicense:number;
	schoolLicense:number
	company:Company;
	status:string;
   createdDate:string;
   modifiedDate:string;

}
