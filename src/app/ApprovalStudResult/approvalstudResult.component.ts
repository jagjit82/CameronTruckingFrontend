import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { StudentResult } from "app/studentresult/studentresult";

import { StudentService } from "app/student/studentservice";
import { EmployeeService } from "app/employee/employee.service";
import { VehicleService } from "app/vehicle/service/vehicle.service";

@Component({
  selector: "approvalstudresult",
  templateUrl: "./approvalstudResult.component.html",
  styleUrls: ["./approvalstudResult.component.css"],
  providers:[EmployeeService]
})
export class ApprovalStudResultComponent implements OnInit {
  studentResults: Observable<StudentResult[]>;
  company:string=sessionStorage.getItem("company");
  
  constructor(private vehicleService: VehicleService,private studentService:StudentService,
    private router: Router,private route: ActivatedRoute) {}
  
  ngOnInit() { 
   this.reloadStudenResult();   
   }

   reloadStudenResult(){
    this.studentService.getDeleteStudentResultListPage(this.company).subscribe(data=>{
      if(data!=null){
        this.studentResults=data;
      }});
   }
   acceptStudResult(id:number){
    this.studentService.deleteStudentResult(id).subscribe(data=>{
      this.reloadStudenResult();
    });
   }
   rejectStudResult(id:number){
    this.studentService.rejectStudentDeletion(id).subscribe(data=>{
      this.reloadStudenResult();
    });
   }
}

 

