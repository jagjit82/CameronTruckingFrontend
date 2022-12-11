import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CommonService } from "app/common/common.service";
import { TestResultService } from "../service/testresult.service";

import { environment } from "environments/environment";
import { TestResult } from "../testresult";
import { TestResultDetailVO } from "../testresultdetailVO";

@Component({
  selector: "app-PhoneLog-list",
  templateUrl: "./testresult-list.component.html",
  styleUrls: ["./testresult-list.component.css"],
  providers:[TestResultService]
})
export class TestResultListComponent implements OnInit {
  testResultVOLs: Observable<TestResultDetailVO[]>;
  role:string;
  company:string=sessionStorage.getItem("company");
  //items: any[] = [];
  config:any;
  pageNum:number=0;
  itemPerPage:number =environment.itemsperpage;
  
  public callerTypeLs: { [key: string]:string; }[] = [
    { Name: 'General', Code: 'General' },
    { Name: 'Student', Code: 'Student' },
    ];
    
    public statusLs: { [key: string]:string; }[] = [
      { Name: 'OPEN', Code: 'OPEN' },
      { Name: 'CLOSED', Code: 'CLOSED' },
      ];

  constructor(private testResultService: TestResultService,private commonService:CommonService,
    private router: Router) {}

  ngOnInit() {
    //this.role=sessionStorage.getItem('role');
    //this.phoneLog.company=this.company;
    this.pageNum=0;
    
    //this.getPageCount();
    this.reloadData();
    
  }

  
  arrayOne(n: number): any[] {
    return Array(n);
  }
  getPhoneLogList(pageNo:number){
    this.pageNum=pageNo;
   // this.phoneLogs = this.PhoneLogService.getPhoneLogsListPage(pageNo,this.sortField,this.sortOrder);
  }
  

  pageChanged(event){
    this.config.currentPage = event;
    //this.phoneLog.pageNumber=event;
    // this.phoneLogService.searchPhoneLogs(this.phoneLog).subscribe(
    //   data=>{
    //     this.phoneLogs=data;
    //   }
    // );
  }

  reloadData() {
    this.testResultService.getTestResults(this.company).subscribe(data=>{
      this.testResultVOLs=data;

    // this.tes.pageNumber=1;
    // this.testResultService.searchPhoneLogs(this.phoneLog).subscribe(
    //   data=>{
    //     this.phoneLogs=data;
    //   }
    // );
  });
    //this.getPageCount();
    //this.phoneLogs.forEach(element => {this.items.push(element)});
    
  }
  deleteTestResult(id: number) {
    this.testResultService.deleteTestResult(id)
      .subscribe(
        data => {
          console.log(data);
          this.commonService.showNotification('top','center',"Instructor Training has been deleted successfully!.")
          this.reloadData();
        },
        error => {console.log(error),this.commonService.showErrorNotification('top','center',"Error!!.. Can not delete PhoneLog as it is mapped with one or more Fleet Records")});
  }

  
  
}
  