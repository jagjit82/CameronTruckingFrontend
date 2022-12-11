import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'app/common/common.service';

import { CompanyService } from 'app/company/companyservice';
import { VehicleService } from 'app/vehicle/service/vehicle.service';
import { Vehicle } from 'app/vehicle/vehicle';
import { ExpenseLog } from '../expenselog';
import { ExpenseLogService } from '../service/expenselog.service';
import { InstructorService } from 'app/instructor/instructorservice';
import { Instructor } from 'app/instructor/instructor';
import { GenericDTO } from 'app/common/genericDTO';
import { Expense } from 'app/Expense/expense';
import { ExpenseService } from 'app/Expense/service/expense.service';
declare var $: any;
@Component({
  selector: 'app-create-expenselog',
  templateUrl: './create-expenselog.component.html',
  styleUrls: ['./create-expenselog.component.css']
})
export class CreateExpenseLogComponent implements OnInit {
  user:string=sessionStorage.getItem('username');
  expenseLog: ExpenseLog = new ExpenseLog();
  company:string=sessionStorage.getItem("company");
  validateexpenseLog: ExpenseLog = new ExpenseLog();
  originalexpenseLog:ExpenseLog = new ExpenseLog();
  expenses: Observable<Expense[]>;
  submitted = false;
  sortField:string="id";
  sortOrder:string="descending";
  genericDTO:GenericDTO= new GenericDTO();
    
    public statusLs: { [key: string]:string; }[] = [
      { Name: 'PAID', Code: 'PAID' },
      { Name: 'NOT PAID', Code: 'NOT PAID' },
      { Name: 'DEFFERED', Code: 'DEFFERED' },
      ];

      public accountTypeLs: { [key: string]:string; }[] = [
        { Name: 'INCOME', Code: 'INCOME' },
        { Name: 'EXPENSE', Code: 'EXPENSE' },
        ];
  


  constructor(private router: Router,private expenseService: ExpenseService,private expenseLogService: ExpenseLogService,private companyService:CompanyService,private route: ActivatedRoute,private commonService:CommonService) { }

  ngOnInit() {
    this.genericDTO.pageNum=0;
    this.genericDTO.company=this.company;
    this.expenseService.getexpensesListPage().subscribe(
      data=>{
        this.expenses=data;
      }
    );
    this.company=sessionStorage.getItem("company");
    this.companyService.getCompany(this.company).subscribe(data=>{
      this.expenseLog.company=data;
    });
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.expenseLogService.getexpenseLog(id).subscribe(data => {
        this.expenseLog= data;
        });
      });
 
  
  }
e
      
  onExpenseLogSelection(){
    console.log("--"+this.expenseLog.id);
  }
  
  save() {
    this.expenseLogService.createExpenseLog(this.expenseLog)
     .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',sessionStorage.getItem('username')+", Expense Log has been created successfully!."),this.expenseLog=new ExpenseLog()
      ;this.router.navigate(['/expenseLogs']);
    }, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Something went wrong!." +error)});
     
  
    }
    //this.expenseLog = new expenseLog();
  
        
  onSubmit() {
    this.save();
  }
  
}
 