import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'app/common/common.service';

import { CompanyService } from 'app/company/companyservice';
import { DieselLog } from '../diesellog';
import { DieselLogService } from '../service/diesellog.service';
import { VehicleService } from 'app/vehicle/service/vehicle.service';
import { Vehicle } from 'app/vehicle/vehicle';
declare var $: any;
@Component({
  selector: 'app-create-dieselLog',
  templateUrl: './create-dieselLog.component.html',
  styleUrls: ['./create-dieselLog.component.css']
})
export class CreateDieselLogComponent implements OnInit {
  user:string=sessionStorage.getItem('username');
  dieselLog: DieselLog = new DieselLog();
  company:string=sessionStorage.getItem("company");
  validatedieselLog: DieselLog = new DieselLog();
  originaldieselLog:DieselLog = new DieselLog();
  vehicles: Observable<Vehicle[]>;
  submitted = false;
  sortField:string="id";
	sortOrder:string="descending";
  

  constructor(private router: Router,private vehicleService: VehicleService,private dieselService: DieselLogService,private dieselLogService: DieselLogService,private companyService:CompanyService,private route: ActivatedRoute,private commonService:CommonService) { }

  ngOnInit() {
    this.sortField="vehicleNo";
    this.sortOrder="ascending";
    this.vehicles = this.vehicleService.getVehiclesListPage(0,this.sortField,this.sortOrder,this.company);
   
  }

      
  onDieselSelection(){
    console.log("--"+this.dieselLog.id);
  }
  
  save() {
    this.dieselLogService.createDieselLog(this.dieselLog)
     .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',sessionStorage.getItem('username')+" - Your Diesel Log has been created successfully!."),this.dieselLog=new DieselLog()
      ;this.router.navigate(['/listDieselLog']);
    }, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Something went wrong!." +error)});
     
  
    }
    //this.dieselLog = new dieselLog();
  

  
  onSubmit() {
    this.save();
  }
  
}
 