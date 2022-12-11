import { Observable } from "rxjs";
import { Component, OnInit, Inject, Input } from "@angular/core";
import { Router } from '@angular/router';
import { EmployeeHourLog } from "../employeehourlog";
import { EmployeeService } from "app/employee/employee.service";


@Component({
  selector: "app-employeehourLog-list",
  templateUrl: "./employeehourLog-list.component.html",
  styleUrls: ["./employeehourLog-list.component.css"]
})
export class EmployeehourLogListComponent implements OnInit {
  
  employeeHourLogs: Observable<EmployeeHourLog[]>;
  employeehourLog:EmployeeHourLog = new EmployeeHourLog();
  role:string;
  company:string
  sortField:string="id";
	sortOrder:string="descending";
  constructor(private employeeService: EmployeeService,
    private router: Router) {}

  pageNum:number=0;
  totalPages:number=0;
  

  ngOnInit() {
    this.company=sessionStorage.getItem("company");
    this.pageNum=0;
    this.reloadData();
  }

  reloadData() {
     this.employeeService.getEmployeesHourLogList(this.company).subscribe(data=>{
      this.employeeHourLogs =data;
    });
    console.log(this.employeeHourLogs);
    
}
   
  
deleteEmployeeHourLog(id: number) {
    this.employeeService.deleteEmployeeHourLog(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
}

