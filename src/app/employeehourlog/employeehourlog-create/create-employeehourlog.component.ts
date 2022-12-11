
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { InstructorService } from 'app/instructor/instructorservice';
import { CommonService } from 'app/common/common.service';
import { Vehicle } from 'app/vehicle/vehicle';
import { VehicleService } from 'app/vehicle/service/vehicle.service';
import { CompanyService } from 'app/company/companyservice';

import { EmployeeHourLog } from '../employeehourlog';
import { EmployeeService } from 'app/employee/employee.service';
import { Employee } from 'app/employee/employee';


@Component({
  selector: 'app-create-employeehourlog',
  templateUrl: './create-employeehourlog.component.html',
  styleUrls: ['./create-employeehourlog.component.css']
})
export class CreateEmployeeHourLogComponent implements OnInit {
  employeehourLogs:Observable<EmployeeHourLog[]>;
  employeeHourLog: EmployeeHourLog = new EmployeeHourLog();
  employees:Observable<Employee[]>;;
  submitted = false;
  company:string;
  showAmount:boolean=false;
  balanceAmountService:number;
  balanceAmount:number;
  totalAmount:number;
  sortField:string="id";
	sortOrder:string="descending";
  
  constructor(private router: Router,private employeeService:EmployeeService,private companyService:CompanyService,private instructorService:InstructorService,private truckService:VehicleService,
    private route: ActivatedRoute,private commonService:CommonService) { }

  ngOnInit() {
    this.company=sessionStorage.getItem("company");
    this.employees = this.employeeService.getEmployeesList(this.company);
   
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.employeeService.getEmployeeHourLog(id).subscribe(data => {
        this.employeeHourLog= data;
        });
      });
    }
  
      save() {
    //this.employeeHourLog.status=true;
    if(this.employeeHourLog.id!=null){
      this.employeeService.updateEmployeeHourLog(this.employeeHourLog).subscribe(data => {console.log(data),this.commonService.showNotification('top','center',"Hurray! "+sessionStorage.getItem('username')+" - Your Fleet Log has been updated successfully!."),this.employeeHourLog=new EmployeeHourLog()}, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!.")});
    }else{
    this.employeeService.createEmployeeHourLog(this.employeeHourLog)
    .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',"Hurray! "+sessionStorage.getItem('username')+" - Your EmployeehourLog Result has been created successfully!."),this.employeeHourLog=new EmployeeHourLog()}, error => {console.log(error),this.commonService.showErrorNotification('top','center'," Something went wrong!." +error)});
    this.employeeHourLog = new EmployeeHourLog();
    }
    this.router.navigate(['/employeeHourLogs']);
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
 