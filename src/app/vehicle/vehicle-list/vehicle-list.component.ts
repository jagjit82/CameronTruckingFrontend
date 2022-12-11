import { Observable } from "rxjs";

import { Component, OnInit, Input } from "@angular/core";
import { Router } from '@angular/router';
import { VehicleService } from "../service/vehicle.service";
import { CommonService } from "app/common/common.service";
import { Vehicle } from "../vehicle";
import { environment } from "environments/environment";

@Component({
  selector: "app-vehicle-list",
  templateUrl: "./vehicle-list.component.html",
  styleUrls: ["./vehicle-list.component.css"],
  providers:[VehicleService]
})
export class VehicleListComponent implements OnInit {
  @Input()
  //itemsPerPage: number=10;
  //totalItems: any;
  //page: any=1;
  config:any;
  //count:number=0;
  itemPerPage:number =environment.itemsperpage;
  //previousPage: any;
  vehicles: Observable<Vehicle[]>;
  role:string;
  vehicle:Vehicle;
  company:string=null;
  //items: any[] = [];
  pageNum:number=0;
  totalPages:number=0;
  sortField:string="id";
	sortOrder:string="descending";
  constructor(private vehicleService: VehicleService,private commonService:CommonService,
    private router: Router) {
      this.company=sessionStorage.getItem("company");
    }

  ngOnInit() {
    this.role=sessionStorage.getItem('role');
    this.pageNum=0;
    this.reloadData();
 
  }

  
  pageChanged(event){
    this.config.currentPage = event;
    this.vehicles = this.vehicleService.getVehiclesListPage(event,this.sortField,this.sortOrder,this.company);
    
  }

  

  reloadData() {
    this.vehicleService.getTotalPages(this.company).subscribe(data=>
      {
        this.totalPages=data;
        this.config={
          itemsPerPage: this.itemPerPage,
          currentPage: 1,
          totalItems: this.totalPages};    
          this.vehicles = this.vehicleService.getVehiclesListPage(this.config.currentPage,this.sortField,this.sortOrder,this.company);
    
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
}
  