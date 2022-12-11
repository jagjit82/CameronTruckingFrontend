import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CommonService } from "app/common/common.service";
import { GenericDTO } from "app/common/genericDTO";
import { Instructor } from "../instructor";
import { InstructorService } from "../instructorservice";
import { RemindersService } from "app/reminders/service/reminders.service";
import { Reminders } from "app/reminders/reminders";

@Component({
  selector: "app-instructor-list",
  templateUrl: "./instructorexpiry-list.component.html",
  styleUrls: ["./instructorexpiry-list.component.css"]
})
export class InstructorExpiryListComponent implements OnInit {
  instructors: Observable<Instructor[]>;
  role:string;
  pageNum:number=0;
  totalPages:number=0;
  reminders: Reminders;
  searchInstructor:string;
  company:string=sessionStorage.getItem("company");
  instructorLicenceExp:Date = new Date();
  operatorLicenceExp:Date = new Date();
  today:Date= new Date();
  

  constructor(private instructorService: InstructorService,private reminderService:RemindersService,private commonService:CommonService,
    private router: Router) {}

    highLightInstructorLicenseExp(dateStr:string):string{
      this.instructorLicenceExp=new Date(new Date().setDate(new Date().getDate()+this.reminders.instructorLicenceExp));
      var paramDate= new Date(dateStr);
      if(paramDate>this.today && paramDate<this.instructorLicenceExp){
        return "true";
      }
      return "false";
    }
    highLightOperatorLicenseExp(dateStr:string):string{
      this.operatorLicenceExp=new Date(new Date().setDate(new Date().getDate()+this.reminders.operatorLicenceExp));
      var paramDate= new Date(dateStr);
      if(paramDate>this.today && paramDate<this.operatorLicenceExp){
        return "true";
      }
      return "false";
    }

    ngOnInit() {
    this.role=sessionStorage.getItem('role');
    this.reloadData();
  }

  
  reloadData() {
    this.reminderService.getremindersList(this.company).subscribe(data=>{
      if(data!=null){
        this.reminders=data;
      }});
    
    this.instructors = this.instructorService.instructorExpiryReminder(this.company);
   }

}
