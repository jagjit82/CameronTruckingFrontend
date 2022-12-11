import { Instructor } from '../instructor/instructor';
import { Vehicle } from 'app/vehicle/vehicle';
import { Company } from 'app/company/company';
import { StudentResult } from 'app/studentresult/studentresult';

export class Student {
	 id:number;
	 studentNum:string;
	 firstName:string;
	 middleName:string;
	 lastName:string;
	 dateOfBirth:string;
	 licenseExpiry:string;
	 address:string;
	 city:string;
	 postalCode:string;
	 mVID:string;
	 studentClass:string;
	 fromClass:number;
	 toClass:number;
	 endorsementQ:string;
	 license:string;
	 phoneNo:string;
	 emergencyContact:string;
	 email:string;
	 course:string;
	 paymentMode:string;
	 reference:string;
	 invoice:string;
	 prefferedHours:number;
	 discount:number;
	 issueDate:string;
	 registrationDate:string
	 totalAmount:number;
	 paymentsReceived:number;
	 fundingAgency:string;
	 status:string;
	 createdDate:string;
	 modifiedDate:string;
	 company:Company;
	 studentResult:StudentResult;
	 day1:string;
	 day2:string;
	 day3:string;
	 day4:string;
	 day5:string;
	 day6:string;
	 day7:string;
	 startTime:string
	 endTime:string;

}
