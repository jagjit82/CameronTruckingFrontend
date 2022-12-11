import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CommonService } from "app/common/common.service";
import { VehicleLogService } from "app/vehiclelog/service/vehicleLog.service";
import { VehicleLog } from "app/vehiclelog/vehicleLog";

@Component({
  selector: "approvals-vehicle-list",
  templateUrl: "./approvalvehiclelog.component.html",
  styleUrls: ["./approvalvehiclelog.component.css"],
  providers:[VehicleLogService]
})
export class ApprovalVehicleLogComponent implements OnInit {
  vehicleLogs: Observable<VehicleLog[]>;
  role:string;
  vehicle:VehicleLog;
  company:string=sessionStorage.getItem("company");
  //items: any[] = [];
  pageNum:number=0;
  totalPages:number=0;
  sortField:string="id";
	sortOrder:string="descending";
  constructor(private vehicleService: VehicleLogService,private commonService:CommonService,
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
    //this.vehicleLogs = this.vehicleService.getVehicleLogsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  sortByVehicleLogNum(){
    console.log("inside table header")
    this.sortField="vehicleNum";
    if(this.sortOrder==="ascending"){
      this.sortOrder="descending";
    }else{
      this.sortOrder="ascending";
    }
    //this.vehicleLogs = this.vehicleService.getVehicleLogsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  arrayOne(n: number): any[] {
    return Array(n);
  }
  getVehicleLogList(pageNo:number){
    this.pageNum=pageNo;
   // this.vehicleLogs = this.vehicleService.getVehicleLogsListPage(pageNo,this.sortField,this.sortOrder);
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
    //this.vehicleLogs = this.vehicleService.getVehicleLogsListPage(this.pageNum,this.sortField,this.sortOrder);
   }
  prev(){
    this.pageNum=this.pageNum-1;
    if(this.pageNum<0){this.pageNum=0;}
    //this.vehicleLogs = this.vehicleService.getVehicleLogsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  next(){
    this.pageNum=this.pageNum+1;
    if(this.pageNum>=this.totalPages){this.pageNum=this.totalPages-1;}
    //this.vehicleLogs = this.vehicleService.getVehicleLogsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  last(){
      this.pageNum=this.totalPages-1;
      //this.vehicleLogs = this.vehicleService.getVehicleLogsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
   

  reloadData() {
    this.vehicleService.getVehicleLogsApprovalsPage(this.company).subscribe(
      data=>{
        this.vehicleLogs=data;
      }
    );
    //this.getPageCount();
    //this.vehicleLogs.forEach(element => {this.items.push(element)});
    
  }
  exportVehicleLog(){
    //console.log("items list "+this.items)
    this.vehicleService.exportVehicleLogsList().subscribe(data=>{});
    //this.excelService.exportAsExcelFile(this.transform(),"vehicleLogs");
    
  }
  deleteVehicleLog(id: number) {
    this.vehicleService.deleteVehicleLog(id)
      .subscribe(
        data => {
          console.log(data);
          this.commonService.showNotification('top','center',"VehicleLog has been deleted successfully!.")
          this.reloadData();
        },
        error => {console.log(error),this.commonService.showErrorNotification('top','center',"Error!!.. Can not delete VehicleLog as it is mapped with one or more Fleet Records")});
  }
  rejectVehicleLog(id: number) {
    this.vehicleService.rejectVehicleLog(id)
      .subscribe(
        data => {
          console.log(data);
          this.commonService.showNotification('top','center',"VehicleLog has been rejected!.")
          this.reloadData();
        },
        error => {console.log(error),this.commonService.showErrorNotification('top','center',"Error!!.. Can not delete VehicleLog as it is mapped with one or more Fleet Records")});
  }
}
  