import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CommonService } from "app/common/common.service";
import { DieselLog } from "../diesellog";
import { DieselLogService } from "../service/diesellog.service";

@Component({
  selector: "app-diesel-list",
  templateUrl: "./diesellog-list.component.html",
  styleUrls: ["./diesellog-list.component.css"],
  providers:[DieselLogService]
})
export class DieselLogListComponent implements OnInit {
  dieselLogs: Observable<DieselLog[]>;
  role:string;
  diesel:DieselLog;
  company:string=sessionStorage.getItem("company");
  //items: any[] = [];
  pageNum:number=0;
  totalPages:number=0;
  sortField:string="id";
	sortOrder:string="descending";
  constructor(private dieselService: DieselLogService,private commonService:CommonService,
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
    //this.dieselLogs = this.dieselService.getDieselLogsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  sortByDieselLogNum(){
    console.log("inside table header")
    this.sortField="dieselNum";
    if(this.sortOrder==="ascending"){
      this.sortOrder="descending";
    }else{
      this.sortOrder="ascending";
    }
    //this.dieselLogs = this.dieselService.getDieselLogsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  arrayOne(n: number): any[] {
    return Array(n);
  }
  getDieselLogList(pageNo:number){
    this.pageNum=pageNo;
   // this.dieselLogs = this.dieselService.getDieselLogsListPage(pageNo,this.sortField,this.sortOrder);
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
    //this.dieselLogs = this.dieselService.getDieselLogsListPage(this.pageNum,this.sortField,this.sortOrder);
   }
  prev(){
    this.pageNum=this.pageNum-1;
    if(this.pageNum<0){this.pageNum=0;}
    //this.dieselLogs = this.dieselService.getDieselLogsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  next(){
    this.pageNum=this.pageNum+1;
    if(this.pageNum>=this.totalPages){this.pageNum=this.totalPages-1;}
    //this.dieselLogs = this.dieselService.getDieselLogsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  last(){
      this.pageNum=this.totalPages-1;
      //this.dieselLogs = this.dieselService.getDieselLogsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
   

  reloadData() {
    this.sortField="id";
    this.sortOrder="descending";
    this.dieselService.getDieselLogsListPage(0,this.sortField,this.sortOrder,this.company).subscribe(
      data=>{
        this.dieselLogs=data;
      }
    );
    //this.getPageCount();
    //this.dieselLogs.forEach(element => {this.items.push(element)});
    
  }
  exportDieselLog(){
    //console.log("items list "+this.items)
    this.dieselService.exportDieselLogsList().subscribe(data=>{});
    //this.excelService.exportAsExcelFile(this.transform(),"dieselLogs");
    
  }
  deleteDieselLog(id: number) {
    this.dieselService.deleteDieselLog(id)
      .subscribe(
        data => {
          console.log(data);
          this.commonService.showNotification('top','center',"DieselLog has been deleted successfully!.")
          this.reloadData();
        },
        error => {console.log(error),this.commonService.showErrorNotification('top','center',"Error!!.. Can not delete DieselLog as it is mapped with one or more Fleet Records")});
  }
}
  