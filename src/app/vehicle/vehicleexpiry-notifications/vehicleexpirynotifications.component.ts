import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { VehicleService } from "../service/vehicle.service";
import { CommonService } from "app/common/common.service";
import { Vehicle } from "../vehicle";
import { RemindersService } from "app/reminders/service/reminders.service";
import { Reminders } from "app/reminders/reminders";

@Component({
  selector: "app-vehicleexpirynotifications-list",
  templateUrl: "./vehicleexpirynotifications.component.html",
  styleUrls: ["./vehicleexpirynotifications.component.css"],
  providers:[VehicleService]
})
export class VehicleExpiryNotificationsComponent implements OnInit {
  vehicles: Observable<Vehicle[]>;
  expiryType:string;
  reminders: Reminders;
  company:string=sessionStorage.getItem("company");
  cvipDate:Date = new Date();
  plateNoDate:Date = new Date();
  insuranceExpiry:Date = new Date();
  today:Date= new Date();

  constructor(private vehicleService: VehicleService,private remindersService:RemindersService,
    private router: Router,private route: ActivatedRoute) {}

  highLightPlateNoDate(dateStr:string):string{
    this.plateNoDate=new Date(new Date().setDate(new Date().getDate()+this.reminders.plateNoExp));
    var paramDate= new Date(dateStr);
    if(paramDate>this.today && paramDate<this.plateNoDate){
      return "true";
    }
    return "false";
  }
  highLightCVIPDate(dateStr:string):string{
    this.cvipDate=new Date(new Date().setDate(new Date().getDate()+this.reminders.cvipDate));
    var paramDate= new Date(dateStr);
    if(paramDate>this.today && paramDate<this.cvipDate){
      return "true";
    }
    return "false";
  }
  highLightInsuranceDate(dateStr:string):string{
    this.insuranceExpiry=new Date(new Date().setDate(new Date().getDate()+this.reminders.vehicleInsuranceExpiry));
    var paramDate= new Date(dateStr);
    if(paramDate>this.today && paramDate<this.insuranceExpiry){
      return "true";
    }
    return "false";
  }  
  
  ngOnInit() { 
    this.remindersService.getremindersList(this.company).subscribe(data=>{
      if(data!=null){
        this.reminders=data;
      }});
      this.vehicleService.vehiclesCvipAndPlateExpiry(this.company).subscribe(data=>{
        this.vehicles=data;
      });
    
   }
}

 

