import { Company } from "app/company/company";
import { Vehicle } from "app/vehicle/vehicle";
import { Instructor } from "app/instructor/instructor";
import { Expense } from "app/Expense/expense";

export class ExpenseLog {
   id: number;
   expenseDate:string;
   expense:Expense;
   expenseAmount:string
	paymentMode:string;
   description:string;
   accountType:string;
   status:string;
   createdDate:string;
   company:Company;
	
}
