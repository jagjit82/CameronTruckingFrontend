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
import { Test } from '../test';
import { TestService } from '../service/test.service';
import { EmployeeService } from 'app/employee/employee.service';
import { Employee } from 'app/employee/employee';
declare var $: any;
@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {
  user:string=sessionStorage.getItem('username');
  test: Test = new Test();
  company:string=sessionStorage.getItem("company");
  validatetest: Test = new Test();
  originaltest:Test = new Test();
  employees: Observable<Employee[]>;
  
  submitted = false;
  public categories: { [key: string]:string; }[] = [
    { Name: 'Inventory', Code: 'Inventory' },
    { Name: 'Finanace', Code: 'Finance' },
    { Name: 'Software', Code: 'Software' },
    { Name: 'Test', Code: 'Test' },
    { Name: 'Others', Code: 'Others' },
    ];

  constructor(private router: Router,private instructorService: InstructorService,private testService: TestService,private companyService:CompanyService,private route: ActivatedRoute,private commonService:CommonService,private employeeService:EmployeeService) { }

  ngOnInit() {
    this.employees = this.employeeService.getEmployeesList(this.company);
    this.employeeService.findByUser(this.user).subscribe(data=>{
    });
    this.company=sessionStorage.getItem("company");
    this.companyService.getCompany(this.company).subscribe(data=>{
      this.test.company=data;
    });
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.testService.gettest(id).subscribe(data => {
        this.test= data;
        });
      });
 
  
  }

      
  onTestSelection(){
    
  }
  
  save() {
    this.testService.createtest(this.test)
     .subscribe(data => {this.commonService.showNotification('top','center',sessionStorage.getItem('username')+", Test has been created successfully!."),this.test=new Test()
      ;
    }, error => {
      this.commonService.showErrorNotification('top','center',"Something went wrong!." +error)});
     
  
    }
    //this.test = new test();
  

  
  onSubmit() {
    this.save();
  }
  
}
 