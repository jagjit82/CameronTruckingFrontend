import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { StudentResult } from "app/studentresult/studentresult";

import { StudentService } from "app/student/studentservice";
import { EmployeeService } from "app/employee/employee.service";
import { VehicleService } from "app/vehicle/service/vehicle.service";

@Component({
  selector: "app-vehicleexpirynotifications-list",
  templateUrl: "./approvalnotifications.component.html",
  styleUrls: ["./approvalsnotifications.component.css"],
  providers:[EmployeeService]
})
export class ApprovalNotificationsComponent implements OnInit {
  studentResults: Observable<StudentResult[]>;
  company:string=sessionStorage.getItem("company");
  
  constructor(private vehicleService: VehicleService,private studentService:StudentService,
    private router: Router,private route: ActivatedRoute) {}
  
  ngOnInit() { 
   
   }

   
}

 

