import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CommonService } from "app/common/common.service";
import { ExpenseLog } from "../expenselog";
import { ExpenseLogService } from "../service/expenselog.service";
import { environment } from "environments/environment";
import { ExpenseLogSearch } from "../expenselogSearch";
import { ExpenseService } from "app/Expense/service/expense.service";
import { Expense } from "app/Expense/expense";

@Component({
  selector: "app-ExpenseLog-list",
  templateUrl: "./expenselog-list.component.html",
  styleUrls: ["./expenselog-list.component.css"],
  providers:[ExpenseLogService]
})
export class ExpenseLogListComponent implements OnInit {
  expenseLogs: Observable<ExpenseLog[]>;
  expenses: Observable<Expense[]>;
  expenseAmount:Object;
  incomeAmount:Object;
  showIncome:boolean=false;
  showExpense:boolean=false;
  role:string;
  expenseLog: ExpenseLogSearch = new ExpenseLogSearch();
  company:string=sessionStorage.getItem("company");
  //items: any[] = [];
  config:any;
  pageNum:number=0;
  itemPerPage:number =environment.itemsperpage;
  public statusLs: { [key: string]:string; }[] = [
    { Name: 'PAID', Code: 'PAID' },
    { Name: 'NOT PAID', Code: 'NOT PAID' },
    { Name: 'DEFFERED', Code: 'DEFFERED' },
    ];
    public accountTypeLs: { [key: string]:string; }[] = [
      { Name: 'INCOME', Code: 'INCOME' },
      { Name: 'EXPENSE', Code: 'EXPENSE' },
      ];
  
  constructor(private expenseLogService: ExpenseLogService,private expenseService:ExpenseService ,private commonService:CommonService,
    private router: Router) {}

  ngOnInit() {
    //this.role=sessionStorage.getItem('role');
    this.expenseLog.company=this.company;
    this.pageNum=0;
    //this.getPageCount();
    this.reloadData();
    
  }

  
  arrayOne(n: number): any[] {
    return Array(n);
  }
  getExpenseLogList(pageNo:number){
    this.pageNum=pageNo;
   // this.expenseLogs = this.ExpenseLogService.getExpenseLogsListPage(pageNo,this.sortField,this.sortOrder);
  }
  
  
  pageChanged(event){
    this.config.currentPage = event;
    this.expenseLog.pageNumber=event;
    this.expenseLogService.searchExpenseLogs(this.expenseLog).subscribe(
      data=>{
        this.expenseLogs=data;
      }
    );
  }

  reloadData() {
    this.expenseService.getexpensesListPage().subscribe(
      data=>{
        this.expenses=data;
      }
    );
    
    this.expenseLogService.searchExpenseLogCount(this.expenseLog).subscribe(data=>{
    this.config={
      itemsPerPage: this.itemPerPage,
      currentPage: 1,
      totalItems: data
    };
    this.expenseLogService.searchExpenseLogs(this.expenseLog).subscribe(
      data=>{
        console.log("data in response is "+data)
        this.expenseLogs=data;
        }
      
    );
    
  });
    //this.getPageCount();
    //this.expenseLogs.forEach(element => {this.items.push(element)});
    
  }
  deleteExpenseLog(id: number) {
    this.expenseLogService.deleteexpenseLog(id)
      .subscribe(
        data => {
          console.log(data);
          this.commonService.showNotification('top','center',"Instructor Training has been deleted successfully!.")
          this.reloadData();
        },
        error => {console.log(error),this.commonService.showErrorNotification('top','center',"Error!!.. Can not delete ExpenseLog as it is mapped with one or more Fleet Records")});
  }

  searchExpenseLog(){
    if(this.expenseLog.accountType=="INCOME"){
        this.showIncome=true;
        this.showExpense=false;
      }else if(this.expenseLog.accountType=="EXPENSE"){
        this.showIncome=false;
        this.showExpense=true;
      }else{
        this.showIncome=true;
        this.showExpense=true;
      }
    this.expenseLog.company=this.company;
    this.expenseLogService.searchExpenseLogCount(this.expenseLog).subscribe(
      data=>{
        this.config={
          itemsPerPage: this.itemPerPage,
          currentPage: 1,
          totalItems: data
        };
      }
    );
    this.expenseLogService.searchExpenseLogs(this.expenseLog).subscribe(
      data=>{
        console.log("data in response is "+data)
        this.expenseLogs=data;
      }
    );

    if(this.showExpense){
      this.expenseLogService.sumExpenseLogs(this.expenseLog).subscribe(
        data=>{
          console.log("data in response is "+data)
          this.expenseAmount=data;
        }
      );
    }
    if(this.showIncome){
      this.expenseLogService.sumIncomeLogs(this.expenseLog).subscribe(
        data=>{
          console.log("data in response is "+data)
          this.incomeAmount=data;
        }
    );
    }
    
    
  }
  reset(){
    this.expenseLog=new ExpenseLogSearch();
  }
  export(){
    this.expenseLogService.exportSearchExpenseLog(this.expenseLog)
    .subscribe(data => {this.commonService.showNotification('top','center',"Exporting your records...!!!")}, error => {console.log(error),this.commonService.showErrorNotification('top','center'," Something went wrong!." +error)});  
  }
  exportYearlyLog(){
    this.expenseLogService.exportSearchExpenseLogMonthly(this.expenseLog)
    .subscribe(data => {this.commonService.showNotification('top','center',"Exporting your records...!!!")}, error => {console.log(error),this.commonService.showErrorNotification('top','center'," Something went wrong!." +error)});  
  }
}
  