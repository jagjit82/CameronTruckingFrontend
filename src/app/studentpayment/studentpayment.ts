import { Instructor } from '../instructor/instructor';
import { Vehicle } from 'app/vehicle/vehicle';
import { Company } from 'app/company/company';
import { Student } from 'app/student/student';

export class StudentPayment {
	 id:number;
	 payment:number;
	 student:Student;
	 paymentDate:string;
	 remarks:string;
	 status:string;
	 createdDate:string;
	 modifiedDate:string;
 
}
