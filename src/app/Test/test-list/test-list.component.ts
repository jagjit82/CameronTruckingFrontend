import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CommonService } from "app/common/common.service";
import { Test } from "../test";
import { TestService } from "../service/test.service";
import { Employee } from "app/employee/employee";
import { EmployeeService } from "app/employee/employee.service";

@Component({
  selector: "app-Test-list",
  templateUrl: "./test-list.component.html",
  styleUrls: ["./test-list.component.css"],
  providers:[TestService]
})
export class TestListComponent implements OnInit {
  tests: Observable<Test[]>;
  modalViewTests: Observable<Test[]>;
  test:Test;
  replyMess:Test=new Test();
  sender:Employee=new Employee();
  modalMess:Test=new Test();
  company:string=sessionStorage.getItem("company");
  loginUser:Employee;
  userName:string=sessionStorage.getItem("username");
  //items: any[] = [];
  constructor(private testService: TestService,private commonService:CommonService,
    private router: Router,private employeeService:EmployeeService) {}

  ngOnInit() {
    //this.role=sessionStorage.getItem('role');
    //this.getPageCount();
    this.employeeService.findByUser(this.userName).subscribe(data=>{
      this.loginUser=data;
    });
    this.reloadData();
    
  }

  readTest(mess:Test){
    this.modalMess=mess;
    this.testService.getTestsById(mess.id).subscribe(
      data=>{
        this.modalViewTests=data;
      }
    );
    
  }
    
  reloadData() {
    this.testService.gettestsListPage(this.company).subscribe(
      data=>{
        this.tests=data;
      }
    );
    //this.getPageCount();
    //this.tests.forEach(element => {this.items.push(element)});
    
  }
  deleteTest(id: number) {
    this.testService.deletetest(id)
      .subscribe(
        data => {
          console.log(data);
          this.commonService.showNotification('top','center',"Test has been deleted successfully!.")
          this.reloadData();
        },
        error => {console.log(error),this.commonService.showErrorNotification('top','center',"Error!!.. Can not delete Test as it is mapped with one or more Fleet Records")});
  }
}
  