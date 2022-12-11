import { Company } from "app/company/company";
import { Vehicle } from "app/vehicle/vehicle";
import { Instructor } from "app/instructor/instructor";

export class InstructorMonitoring {
   id: number;
   instructorTrainee:Instructor ;
	monitoredDate:string;
	hours:number;
	trainingName:string;
	instructorMonitor:Instructor;
	status:string;
   createdDate:string;
   modifiedDate:string;
   
}
