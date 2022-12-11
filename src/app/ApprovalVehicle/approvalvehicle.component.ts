import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CommonService } from "app/common/common.service";
import { VehicleService } from "app/vehicle/service/vehicle.service";
import { Vehicle } from "app/vehicle/vehicle";

@Component({
  selector: "approval-vehicle",
  templateUrl: "./approvalvehicle.component.html",
  styleUrls: ["./approvalvehicle.component.css"],
  providers:[VehicleService]
})
export class ApprovalVehicleComponent implements OnInit {
  vehicles: Observable<Vehicle[]>;
  role:string;
  vehicle:Vehicle;
  company:string=sessionStorage.getItem("company");
  //items: any[] = [];
  pageNum:number=0;
  totalPages:number=0;
  sortField:string="id";
	sortOrder:string="descending";
  constructor(private vehicleService: VehicleService,private commonService:CommonService,
    private router: Router) {}

  ngOnInit() {
    this.role=sessionStorage.getItem('role');
    this.pageNum=0;
    this.reloadData();
    //this.getPageCount();
  // var range = _.range(1,this.totalPages);
    console.log("reload pages   jkjkjkjh"+this.totalPages)
 
  }

  
  
  reloadData() {
     this.vehicleService.getVehiclesApprovalPage(this.company).subscribe(data=>{
      this.vehicles=data
    });
    
  }
  
  deleteVehicle(id: number) {
    this.vehicleService.deleteVehicle(id)
      .subscribe(
        data => {
          console.log(data);
          this.commonService.showNotification('top','center',"Vehicle has been deleted successfully!.")
          this.reloadData();
        },
        error => {console.log(error),this.commonService.showErrorNotification('top','center',"Error!!.. Can not delete Vehicle as it is mapped with one or more Fleet Records")});
  }
  rejectVehicle(id: number) {
    this.vehicleService.rejectVehicle(id)
      .subscribe(
        data => {
          console.log(data);
          this.commonService.showNotification('top','center',"Vehicle has been rejected!.")
          this.reloadData();
        },
        error => {console.log(error),this.commonService.showErrorNotification('top','center',"Error!!.. Can not delete VehicleLog as it is mapped with one or more Fleet Records")});
  }
}
  