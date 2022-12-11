import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Employee } from "../employee";
import { EmployeeService } from "../employee.service";
import { CommonService } from "app/common/common.service";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  employees: Observable<Employee[]>;
  role:string;
  userName:string;
  company:string;
  constructor(private employeeService: EmployeeService,private commonService:CommonService,
    private router: Router) {}

  ngOnInit() {
    this.company=sessionStorage.getItem("company");
    this.role=sessionStorage.getItem('role');
    this.userName=sessionStorage.getItem('username');
    this.reloadData();
  }

  reloadData() {
    this.employees = this.employeeService.getEmployeesList(this.company);
  }

  DeactivateEmployee(id:number){
    this.employeeService.deactivateEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
  ActivateEmployee(id:number){
    this.employeeService.activateEmployee(id)
      .subscribe(
        data => {
          this.reloadData();
        },
        error => console.log(error));
  }
  deleteEmployee(id:number){
    this.employeeService.deleteEmployee(id)
    .subscribe(
      data => {
        this.commonService.showNotification('top','center',"User has been deleted successfully!.");
        this.reloadData();
      },
      error => {console.log(error),this.commonService.showErrorNotification('top','center',"Error!!.. Can not delete User..perhaps it is mapped with something")});
  }

  
  showDeleteButton(employee:Employee){
    //if(employee.userName.toLowerCase()!=this.userName.toLowerCase() && 'ADMIN'==this.role){
      return true;
    //}
    //  return false;
  }
}
