import { Company } from "app/company/company";
import { Vehicle } from "app/vehicle/vehicle";

export class VehicleLog {
   id: number;
   vehicle:Vehicle;
   mechanicName:string;
   repairDate:string;
   repairAmt:string;
   description:string;
   labourParts:string;
   labourAmt:string;
   diesel:string;
   createdDate:string;
   modifiedDate:string;
   status:string;
   
}
