import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from "app/common/common.service";
import { RemindersService } from "app/reminders/service/reminders.service";
import { Reminders } from "app/reminders/reminders";
import { CompanyService } from "app/company/companyservice";
import { CompanyDetails } from "../companydetails";

@Component({
  selector: "app-companyDetailsexpirynotifications-list",
  templateUrl: "./companyDetailsexpirynotifications.component.html",
  styleUrls: ["./companyDetailsexpirynotifications.component.css"],
  providers:[CompanyService]
})
export class CompanyDetailsExpiryNotificationsComponent implements OnInit {
  companyDetails: Observable<CompanyDetails[]>;
  expiryType:string;
  reminders: Reminders;
  company:string=sessionStorage.getItem("company");
  businessLicense:Date = new Date();
  schoolLicense:Date = new Date();
  insuranceExpiry:Date = new Date();
  today:Date= new Date();

  constructor(private companyService: CompanyService,private remindersService:RemindersService,
    private router: Router,private route: ActivatedRoute) {}

  highLightBusinessLicense(dateStr:string):string{
    this.businessLicense=new Date(new Date().setDate(new Date().getDate()+this.reminders.businessLicense));
    var paramDate= new Date(dateStr);
    if(paramDate>this.today && paramDate<this.businessLicense){
      return "true";
    }
    return "false";
  }
  highLightSchoolLicense(dateStr:string):string{
    this.schoolLicense=new Date(new Date().setDate(new Date().getDate()+this.reminders.schoolLicense));
    var paramDate= new Date(dateStr);
    if(paramDate>this.today && paramDate<this.schoolLicense){
      return "true";
    }
    return "false";
  }
    
  ngOnInit() { 
    this.remindersService.getremindersList(this.company).subscribe(data=>{
      if(data!=null){
        this.reminders=data;
      }});
      this.companyService.getCompanyReminder(this.company).subscribe(data=>{
        this.companyDetails=data;
      });
    
   }
}

 

