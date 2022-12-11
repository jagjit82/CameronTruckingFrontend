import { Instructor } from '../instructor/instructor';
import { Vehicle } from 'app/vehicle/vehicle';
import { Company } from 'app/company/company';
import { Student } from 'app/student/student';

export class StudentLog {
	 id:number;
	 student:Student;
	 instructor:Instructor;
	 logDate:string;
	 startTime:string;
	 hours:string;
	 endTime:string;
	 remarks:string;
	 status:string;
	 createdDate:string;
	 modifiedDate:string;
 
}
