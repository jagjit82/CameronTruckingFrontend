import { Company } from "app/company/company";
import { Vehicle } from "app/vehicle/vehicle";
import { Instructor } from "app/instructor/instructor";

export class InstructorTraining {
   id: number;
   instructorTrainee:Instructor ;
   trainingDate:string;
	hours:number;
	trainingName:string;
	instructorMonitor:Instructor;
	remarks:string;
	status:string;
   createdDate:string;
   modifiedDate:string;
   
}
