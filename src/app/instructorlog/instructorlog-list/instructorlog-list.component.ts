import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CommonService } from "app/common/common.service";
import { InstructorLog } from "../instructorlog";
import { InstructorService } from "app/instructor/instructorservice";
import { Instructor } from "app/instructor/instructor";
import { GenericDTO } from "app/common/genericDTO";
import { InstructorSearch } from "../instructorsearch";


@Component({
  selector: "app-InstructorLog-list",
  templateUrl: "./instructorlog-list.component.html",
  styleUrls: ["./instructorlog-list.component.css"],
  providers:[InstructorService]
})
export class InstructorLogListComponent implements OnInit {
  instructorLogs: Observable<InstructorLog[]>;
  role:string;
  hourSum:number;
  instructiorLog:InstructorLog=new InstructorLog();
  instructorSearch:InstructorSearch=new InstructorSearch();
  
  company:string=sessionStorage.getItem("company");
  //items: any[] = [];
  pageNum:number=0;
  totalPages:number=0;
  sortField:string="id";
  sortOrder:string="descending";
  instructors: Observable<Instructor[]>;
  genericDTO:GenericDTO = new GenericDTO();
  public trainingTypeList: { [key: string]:string; }[] = [
    { Name: 'In Truck', Code: 'In Truck' },
    { Name: 'In Yard', Code: 'In Yard' },
    { Name: 'ClassRoom', Code: 'ClassRoom' },
    { Name: 'AirBrake ClassRoom', Code: 'AirBrake ClassRoom' },
    { Name: 'AirBrake Practical', Code: 'AirBrake Practical' },
    ];
  
  constructor(private instructorLogService: InstructorService,private commonService:CommonService,
    private router: Router) {}

  ngOnInit() {
   
    this.sortField="id";
    this.sortOrder="ascending";
    this.genericDTO.pageNum=0;
    this.genericDTO.company=this.company;
    this.company=sessionStorage.getItem("company");
    this.instructorLogService.getInstructorsListPage(this.genericDTO).subscribe(data=>{
      this.instructors =data;
    });
    this.reloadData();
    
  }

  sortById(){
    this.sortField="id";
    if(this.sortOrder==="ascending"){
      this.sortOrder="descending";
    }else{
      this.sortOrder="ascending";
    }
    //this.instructorLogs = this.InstructorLogService.getInstructorLogsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  sortByInstructorLogNum(){
    console.log("inside table header")
    this.sortField="InstructorLogNum";
    if(this.sortOrder==="ascending"){
      this.sortOrder="descending";
    }else{
      this.sortOrder="ascending";
    }
    //this.instructorLogs = this.InstructorLogService.getInstructorLogsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  arrayOne(n: number): any[] {
    return Array(n);
  }
  getInstructorLogList(pageNo:number){
    this.pageNum=pageNo;
   // this.instructorLogs = this.InstructorLogService.getInstructorLogsListPage(pageNo,this.sortField,this.sortOrder);
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
    //this.instructorLogs = this.InstructorLogService.getInstructorLogsListPage(this.pageNum,this.sortField,this.sortOrder);
   }
  prev(){
    this.pageNum=this.pageNum-1;
    if(this.pageNum<0){this.pageNum=0;}
    //this.instructorLogs = this.InstructorLogService.getInstructorLogsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  next(){
    this.pageNum=this.pageNum+1;
    if(this.pageNum>=this.totalPages){this.pageNum=this.totalPages-1;}
    //this.instructorLogs = this.InstructorLogService.getInstructorLogsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  last(){
      this.pageNum=this.totalPages-1;
      //this.instructorLogs = this.InstructorLogService.getInstructorLogsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
   

  reloadData() {
    this.sortField="id";
    this.sortOrder="descending";
    this.instructorLogService.getinstructorLogsListPage(this.company).subscribe(
      data=>{
        this.instructorLogs=data;
      }
    );
    //this.getPageCount();
    //this.instructorLogs.forEach(element => {this.items.push(element)});
    
  }
  deleteInstructorLog(id: number) {
    this.instructorLogService.deleteinstructorLog(id)
      .subscribe(
        data => {
          console.log(data);
          this.commonService.showNotification('top','center',"Instructor Log has been deleted successfully!.")
          this.reloadData();
        },
        error => {console.log(error),this.commonService.showErrorNotification('top','center',"Error!!.. Can not delete InstructorLog as it is mapped with one or more Fleet Records")});
  }
  searchInstructorLog(){
    this.instructorSearch.company=this.company;
    this.instructorLogService.searchinstructorLogs(this.instructorSearch).subscribe(
      data=>{
        this.instructorLogs=data;
        this.instructorLogService.sumHourInstructorLogsSearch(this.instructorSearch).subscribe(
          data=>{
            this.hourSum=Number(data);
          }
        );
       
      }
    );
    
  }
}
  