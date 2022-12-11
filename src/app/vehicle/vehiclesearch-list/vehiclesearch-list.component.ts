import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { VehicleService } from "../service/vehicle.service";
import { CommonService } from "app/common/common.service";
import { Vehicle } from "../vehicle";


@Component({
  selector: "app-vehicle-list",
  templateUrl: "./vehiclesearch-list.component.html",
  styleUrls: ["./vehiclesearch-list.component.css"],
  providers:[VehicleService]
})
export class VehicleSearchListComponent implements OnInit {
  vehicles: Observable<Vehicle[]>;
  vehicleList: Observable<Vehicle[]>;
  vehicle: Vehicle = new Vehicle();
  vehicleDrop:Vehicle = new Vehicle();
  role:string;
  pageNum:number=0;
  totalPages:number=0;
  totalRecords:number=0;
  constructor(private vehicleService: VehicleService,private commonService:CommonService,
    private router: Router) {}

  ngOnInit() {
    this.role=sessionStorage.getItem('role');
    this.pageNum=0;
    //this.getPageCount();
    this.reloadData();
    //this.getPageCount();
  // var range = _.range(1,this.totalPages);
    console.log("reload pages   jkjkjkjh"+this.totalPages)
 
  }
  getVehicleList(pageNo:number){
    this.pageNum=pageNo;
    //this.vehicle.pageNum=pageNo;
    this.vehicleService.searchVehicle(this.vehicle)
    //.subscribe(data => {this.fleetlogs=data}, error => console.log(error));  
    .subscribe(data => {this.vehicleList=data,console.log("----"+data)}, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!." +error)});  

  }
  
  search() {
    // this.drivers = this.driverService.getDriversList();
    // this.vehicles = this.vehicleService.getVehiclesList();
    this.pageNum=0;
     this.getPageCount();
     this.getTotalSearcedRecords();
     this.vehicleService.searchVehicle(this.vehicle)
     //.subscribe(data => {this.fleetlogs=data}, error => console.log(error));  
     .subscribe(data => {this.vehicleList=data,console.log("----"+data) ,this.commonService.showNotification('top','center',this.totalRecords+" records found...!!!")}, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!." +error)});  
   }
 
   getPageCount(){
    this.vehicleService.getSearchPageCount(this.vehicle).subscribe(data=>
      {this.totalPages=Number(data),console.log("00000000000000000000000000-total pages are--"+this.totalPages)});
   
  }
  onSelectVehicle(){
    this.vehicle.vehicleNo=this.vehicleDrop.vehicleNo;
  }
  arrayOne(n: number): any[] {
    return Array(n);
  }
  
  getTotalSearcedRecords(){
    this.vehicleService.getSearchedRecordsCount(this.vehicle).subscribe(data=>
      {this.totalRecords=Number(data),console.log("00000000000000000000000000-total pages are--"+this.totalRecords)});
   }

   first(){
    this.pageNum=0;
    
    this.vehicleService.searchVehicle(this.vehicle)
    .subscribe(data => {this.vehicleList=data,console.log("----"+data)}, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!." +error)});
   }
  prev(){
    this.pageNum=this.pageNum-1;
    //if(this.pageNum<0){this.pageNum=0;this.vehicle.pageNum=0}
    this.vehicleService.searchVehicle(this.vehicle)
    .subscribe(data => {this.vehicleList=data,console.log("----"+data)}, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!." +error)});
  }
  next(){
    this.pageNum=this.pageNum+1;
    //this.vehicle.pageNum=this.pageNum;
    //if(this.pageNum>=this.totalPages){this.pageNum=this.totalPages-1;this.vehicle.pageNum=this.pageNum}
    this.vehicleService.searchVehicle(this.vehicle)
    .subscribe(data => {this.vehicleList=data,console.log("----"+data)}, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!." +error)});
  }
  last(){
    this.pageNum=this.totalPages-1;
    //this.vehicle.pageNum=this.pageNum;
    this.vehicleService.searchVehicle(this.vehicle)
    .subscribe(data => {this.vehicleList=data,console.log("----"+data)}, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!." +error)});
  }
   

  reloadData() {
    this.vehicles = this.vehicleService.getVehiclesList();
    //this.getPageCount();
  }

  deleteVehicle(id: number) {
    this.vehicleService.deleteVehicle(id)
      .subscribe(
        data => {
          console.log(data);
          this.commonService.showNotification('top','center',"Vehicle has been deleted successfully!.")
          this.vehicleService.searchVehicle(this.vehicle)
          .subscribe(data => {this.vehicleList=data,console.log("----"+data)}, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!." +error)});
        },
        error => {console.log(error),this.commonService.showErrorNotification('top','center',"Error!!.. Can not delete Vehicle as it is mapped with one or more Fleet Records")});
  }
}
