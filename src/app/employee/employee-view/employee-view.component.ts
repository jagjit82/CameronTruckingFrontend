import { Observable } from "rxjs";
import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Employee } from "../employee";
import { EmployeeService } from "../employee.service";


@Component({
  selector: "app-employee-view",
  templateUrl: "./employee-view.component.html",
  styleUrls: ["./employee-view.component.css"]
})
export class EmployeeViewComponent implements OnInit {
  employee: Employee = new Employee();
  modifiedByUser:string;
  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,
 ) {
      
    }

    
  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.employeeService.getEmployee(id).subscribe(data => {
        this.employee= data;
        });
      });
    
  }

  reloadData() {
    
  }
  
  

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
}
