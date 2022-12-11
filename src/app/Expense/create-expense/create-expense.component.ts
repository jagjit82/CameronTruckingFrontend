import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'app/common/common.service';

import { CompanyService } from 'app/company/companyservice';
import { VehicleService } from 'app/vehicle/service/vehicle.service';
import { Vehicle } from 'app/vehicle/vehicle';
import { InstructorService } from 'app/instructor/instructorservice';
import { Instructor } from 'app/instructor/instructor';
import { GenericDTO } from 'app/common/genericDTO';
import { Expense } from '../expense';
import { ExpenseService } from '../service/expense.service';
declare var $: any;
@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit {
  user:string=sessionStorage.getItem('username');
  expense: Expense = new Expense();
  submitted = false;
  
  constructor(private router: Router,private instructorService: InstructorService,private expenseService: ExpenseService,private companyService:CompanyService,private route: ActivatedRoute,private commonService:CommonService) { }

  ngOnInit() {
      var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.expenseService.getexpense(id).subscribe(data => {
        this.expense= data;
        });
      });
 
  
  }

      
  
  save() {
    this.expenseService.createexpense(this.expense)
     .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',sessionStorage.getItem('username')+", Expense has been created successfully!."),this.expense=new Expense()
      ;this.router.navigate(['/expenses']);
    }, error => {console.log(error),
      this.commonService.showErrorNotification('top','center',"Something went wrong!." +error)});
     
  
    }
    //this.expense = new expense();
  

  
  onSubmit() {
    this.save();
  }
  
}
 