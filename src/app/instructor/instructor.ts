import { Company } from "app/company/company";

export class Instructor {
  id: number;
  firstName: string;
  lastName: string;
  instructorLicenseNum: string;
  instructionType: string;
  instructorLicenceExp:string;
  dateOfJoining:string;
  operatorLicenseNum:string;
  operatorLicenceExp:string;
  operatorLicenceClass:string;
  instructorMonitoredDate:string;
  dateOfBirth:string;
  company:Company;
  address:string;
  phone:string;
  email:string;
  emergencyContact:string;
  medicalConditions:string;
  classOfInstructions:string;
  classOfDriverLicense:string;
  active: string;
}
