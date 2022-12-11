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
  selector: 'app-edit-vehicleLog',
  templateUrl: './edit-vehicleLog.component.html',
  styleUrls: ['./edit-vehicleLog.component.css']
})
export class EditvehicleLogComponent implements OnInit {
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
   
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.vehicleLogService.getVehicleLog(id).subscribe(data => {
        this.vehicleLog= data;
        console.log("---->vehicle log id-"+this.vehicleLog.vehicle.id);
        });
      });
 
  
      }

      
  onVehicleSelection(){
    console.log("--"+this.vehicleLog.vehicle.id);
  }
  
  save() {
    //this.vehicleLog.active=true;
    console.log(sessionStorage.getItem('username'));
    //if(this.vehicleLog.id!=null){
      this.vehicleLogService.updateVehicleLog(this.vehicleLog).subscribe(
        data => {
          this.commonService.showNotification('top','center',+this.user+
          " - Your vehicleLog has been updated successfully!.");
          this.vehicleLog=new VehicleLog()},
           error => {console.log(error),
            this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!.")});
    
            this.router.navigate(['/listVehicleLog']);
      }

  
  onSubmit() {
    this.save();
  }
  
}
 