import { Instructor } from '../instructor/instructor';
import { Vehicle } from 'app/vehicle/vehicle';
import { Company } from 'app/company/company';
import { Student } from 'app/student/student';
import { StudentPayment } from './studentPayment';

export class StudentPaymentVO {
	 studPayment:StudentPayment;
	 amountReceived:number;
}
