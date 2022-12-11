import { Student } from 'app/student/student';
import { StudentCourseDetails } from './studentcoursedetails';

export class StudentCourse {
	 id:number;
	 startDate:string;
	 student:Student;
	 endDate:string;
	 cccExpectedDate:string;
	 status:string;
	 createdDate:string;
	 modifiedDate:string;
	 studCourseDetList:StudentCourseDetails[]=[];
 
}
