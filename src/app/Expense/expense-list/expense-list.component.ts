import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CommonService } from "app/common/common.service";
import { Expense } from "../expense";
import { ExpenseService } from "../service/expense.service";

@Component({
  selector: "app-Expense-list",
  templateUrl: "./expense-list.component.html",
  styleUrls: ["./expense-list.component.css"],
  providers:[ExpenseService]
})
export class ExpenseListComponent implements OnInit {
  expenses: Observable<Expense[]>;
  expense:Expense;
  //items: any[] = [];
  constructor(private expenseService: ExpenseService,private commonService:CommonService,
    private router: Router) {}

  ngOnInit() {
    //this.role=sessionStorage.getItem('role');
    //this.getPageCount();
    this.reloadData();
    
  }

  
  reloadData() {
    this.expenseService.getexpensesListPage().subscribe(
      data=>{
        this.expenses=data;
      }
    );
    //this.getPageCount();
    //this.expenses.forEach(element => {this.items.push(element)});
    
  }
  deleteExpense(id: number) {
    this.expenseService.deleteexpense(id)
      .subscribe(
        data => {
          console.log(data);
          this.commonService.showNotification('top','center',"Expense has been deleted successfully!.")
          this.reloadData();
        },
        error => {console.log(error),this.commonService.showErrorNotification('top','center',"Error!!.. Can not delete Expense as it is mapped with one or more Fleet Records")});
  }
}
  