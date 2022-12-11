import { Company } from "app/company/company";
import { Vehicle } from "app/vehicle/vehicle";
import { Instructor } from "app/instructor/instructor";
import { Expense } from "app/Expense/expense";

export class ExpenseLogSearch {
   expenseStartDate:string;
   expenseEndDate:string;
   expense:Expense;
   paymentMode:string;
   accountType:string;
   status:string;
   pageNumber:number;
   company:string;
   

}
