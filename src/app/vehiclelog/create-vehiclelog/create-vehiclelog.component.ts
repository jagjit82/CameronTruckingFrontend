import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'app/common/common.service';

import { VehicleLogService } from '../service/vehicleLog.service';
import { VehicleLog } from '../vehicleLog';
import { CompanyService } from 'app/company/companyservice';
import { Vehicle } from 'app/vehicle/vehicle';
import { VehicleService } from 'app/vehicle/service/vehicle.service';
declare var $: any;
@Component({
  selector: 'app-create-vehicleLog',
  templateUrl: './create-vehicleLog.component.html',
  styleUrls: ['./create-vehicleLog.component.css']
})
export class CreatevehicleLogComponent implements OnInit {
  user:string=sessionStorage.getItem('username');
  vehicleLog: VehicleLog = new VehicleLog();
  company:string=sessionStorage.getItem("company");
  validatevehicleLog: VehicleLog = new VehicleLog();
  originalvehicleLog:VehicleLog = new VehicleLog();
  vehicles: Observable<Vehicle[]>;
  submitted = false;
  sortField:string="id";
	sortOrder:string="descending";
  

  constructor(private router: Router,private vehicleService: VehicleService,private vehicleLogService: VehicleLogService,private companyService:CompanyService,private route: ActivatedRoute,private commonService:CommonService) { }

  ngOnInit() {
    this.sortField="vehicleNo";
    this.sortOrder="ascending";
    this.vehicles = this.vehicleService.getVehiclesListPage(0,this.sortField,this.sortOrder,this.company);
   
  }

      
  onVehicleSelection(){
    console.log("--"+this.vehicleLog.vehicle.id);
  }
  
  save() {
    this.vehicleLogService.createVehicleLog(this.vehicleLog)
     .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',sessionStorage.getItem('username')+" - Your vehicleLog has been created successfully!."),this.vehicleLog=new VehicleLog()}, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!." +error)});
     this.router.navigate(['/listVehicleLog']);
  
    }
    //this.vehicleLog = new vehicleLog();
  

  
  onSubmit() {
    this.save();
  }
  
}
 