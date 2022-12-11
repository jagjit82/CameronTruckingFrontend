import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'app/common/common.service';

import { CompanyService } from 'app/company/companyservice';
import { DieselLog } from '../diesellog';
import { DieselLogService } from '../service/diesellog.service';
import { Vehicle } from 'app/vehicle/vehicle';
import { VehicleService } from 'app/vehicle/service/vehicle.service';
declare var $: any;
@Component({
  selector: 'app-edit-dieselLog',
  templateUrl: './edit-dieselLog.component.html',
  styleUrls: ['./edit-dieselLog.component.css']
})
export class EditdieselLogComponent implements OnInit {
  user:string=sessionStorage.getItem('username');
  dieselLog: DieselLog = new DieselLog();
  company:string=sessionStorage.getItem("company");
  validatedieselLog: DieselLog = new DieselLog();
  originaldieselLog:DieselLog = new DieselLog();
  vehicles: Observable<Vehicle[]>;
  submitted = false;
  sortField:string="id";
	sortOrder:string="descending";
  

  constructor(private router: Router,private vehicleService: VehicleService ,private dieselLogService: DieselLogService,private companyService:CompanyService,private route: ActivatedRoute,private commonService:CommonService) { }

  ngOnInit() {
    this.sortField="vehicleNo";
    this.sortOrder="ascending";
    this.vehicles = this.vehicleService.getVehiclesListPage(0,this.sortField,this.sortOrder,this.company);
   
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.dieselLogService.getDieselLog(id).subscribe(data => {
        this.dieselLog= data;
        });
      });
 
  
      }

      
  onDieselSelection(){
    console.log("--"+this.dieselLog.id);
  }
  
  save() {
    //this.dieselLog.active=true;
    console.log(sessionStorage.getItem('username'));
    //if(this.dieselLog.id!=null){
      this.dieselLogService.updateDieselLog(this.dieselLog).subscribe(
        data => {
          this.commonService.showNotification('top','center',+this.user+
          " - Your dieselLog has been updated successfully!.");
          this.dieselLog=new DieselLog();
          this.router.navigate(['/listDieselLog']);
        },
           error => {console.log(error),
            this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!.")});
    
      }

  
  onSubmit() {
    this.save();
  }
  
}
 