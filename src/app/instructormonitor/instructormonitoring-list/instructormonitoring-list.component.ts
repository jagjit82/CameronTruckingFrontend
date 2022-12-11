import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CommonService } from "app/common/common.service";
import { InstructorMonitoring } from "../instructormonitoring";
import { InstructorMonitoringService } from "../service/instructormonitoring.service";

@Component({
  selector: "app-InstructorMonitoring-list",
  templateUrl: "./instructormonitoring-list.component.html",
  styleUrls: ["./instructormonitoring-list.component.css"],
  providers:[InstructorMonitoringService]
})
export class InstructorMonitoringListComponent implements OnInit {
  instructorMonitorings: Observable<InstructorMonitoring[]>;
  role:string;
  InstructorMonitoring:InstructorMonitoring;
  company:string=sessionStorage.getItem("company");
  //items: any[] = [];
  pageNum:number=0;
  totalPages:number=0;
  sortField:string="id";
	sortOrder:string="descending";
  constructor(private InstructorMonitoringService: InstructorMonitoringService,private commonService:CommonService,
    private router: Router) {}

  ngOnInit() {
    //this.role=sessionStorage.getItem('role');
    this.pageNum=0;
    //this.getPageCount();
    this.reloadData();
    
  }

  sortById(){
    this.sortField="id";
    if(this.sortOrder==="ascending"){
      this.sortOrder="descending";
    }else{
      this.sortOrder="ascending";
    }
    //this.instructorMonitorings = this.InstructorMonitoringService.getInstructorMonitoringsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  sortByInstructorMonitoringNum(){
    console.log("inside table header")
    this.sortField="InstructorMonitoringNum";
    if(this.sortOrder==="ascending"){
      this.sortOrder="descending";
    }else{
      this.sortOrder="ascending";
    }
    //this.instructorMonitorings = this.InstructorMonitoringService.getInstructorMonitoringsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  arrayOne(n: number): any[] {
    return Array(n);
  }
  getInstructorMonitoringList(pageNo:number){
    this.pageNum=pageNo;
   // this.instructorMonitorings = this.InstructorMonitoringService.getInstructorMonitoringsListPage(pageNo,this.sortField,this.sortOrder);
  }
  

  //  transform() {
  //   let keyArr: any[] = Object.keys(this.items[0]),
  //     dataArr = [];
  //     var i=0;
  //     keyArr.forEach((key: any) => {
  //       dataArr.push(this.items[0][key]);
  //     });
  //   return dataArr;
  // }
   first(){
    this.pageNum=0;
    //this.instructorMonitorings = this.InstructorMonitoringService.getInstructorMonitoringsListPage(this.pageNum,this.sortField,this.sortOrder);
   }
  prev(){
    this.pageNum=this.pageNum-1;
    if(this.pageNum<0){this.pageNum=0;}
    //this.instructorMonitorings = this.InstructorMonitoringService.getInstructorMonitoringsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  next(){
    this.pageNum=this.pageNum+1;
    if(this.pageNum>=this.totalPages){this.pageNum=this.totalPages-1;}
    //this.instructorMonitorings = this.InstructorMonitoringService.getInstructorMonitoringsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  last(){
      this.pageNum=this.totalPages-1;
      //this.instructorMonitorings = this.InstructorMonitoringService.getInstructorMonitoringsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
   

  reloadData() {
    this.sortField="id";
    this.sortOrder="descending";
    this.InstructorMonitoringService.getinstructorMonitoringsListPage(0,this.sortField,this.sortOrder,this.company).subscribe(
      data=>{
        this.instructorMonitorings=data;
      }
    );
    //this.getPageCount();
    //this.instructorMonitorings.forEach(element => {this.items.push(element)});
    
  }
  deleteInstructorMonitoring(id: number) {
    this.InstructorMonitoringService.deleteinstructorMonitoring(id)
      .subscribe(
        data => {
          console.log(data);
          this.commonService.showNotification('top','center',"Instructor Monitoring has been deleted successfully!.")
          this.reloadData();
        },
        error => {console.log(error),this.commonService.showErrorNotification('top','center',"Error!!.. Can not delete InstructorMonitoring as it is mapped with one or more Fleet Records")});
  }
}
  