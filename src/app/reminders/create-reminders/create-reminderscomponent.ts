import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'app/common/common.service';

import { CompanyService } from 'app/company/companyservice';
import { VehicleService } from 'app/vehicle/service/vehicle.service';
import { Vehicle } from 'app/vehicle/vehicle';
import { InstructorService } from 'app/instructor/instructorservice';
import { Instructor } from 'app/instructor/instructor';
import { GenericDTO } from 'app/common/genericDTO';
import { Reminders } from '../reminders';
import { RemindersService } from '../service/reminders.service';
declare var $: any;
@Component({
  selector: 'app-create-phonelog',
  templateUrl: './create-reminders.component.html',
  styleUrls: ['./create-reminders.component.css']
})
export class CreateRemindersComponent implements OnInit {
  user:string=sessionStorage.getItem('username');
  reminders: Reminders=new Reminders();
  company:string=sessionStorage.getItem("company");
  validatereminders: Reminders = new Reminders();
  originalreminders:Reminders = new Reminders();
  instructors: Observable<Instructor[]>;
  submitted = false;
  sortField:string="id";
  sortOrder:string="descending";
  genericDTO:GenericDTO= new GenericDTO();

  

  constructor(private router: Router,private remindersService: RemindersService,private companyService:CompanyService,private route: ActivatedRoute,private commonService:CommonService) { }

  ngOnInit() {
    this.genericDTO.pageNum=0;
    this.genericDTO.company=this.company;
    this.company=sessionStorage.getItem("company");
    
    this.companyService.getCompany(this.company).subscribe(data=>{
      this.reminders.company=data;
    });
    this.remindersService.getremindersList(this.company).subscribe(data=>{
      if(data!=null){
        this.reminders=data;
      }
    });
    
  
  }

      
  
  save() {
    if(this.reminders.id!=null){
      this.remindersService.updatereminders(this.reminders)
     .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',sessionStorage.getItem('username')+", Reminder  has been updated successfully!."),
      this.router.navigate(['/reminderss']);
    }, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Something went wrong!." +error)});
    
    }else  
    this.remindersService.createreminders(this.reminders)
     .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',sessionStorage.getItem('username')+", Reminder has been created successfully!."),
      this.router.navigate(['/reminderss']);
    }, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Something went wrong!." +error)});
     
  
    }
    //this.reminders = new reminders();
  

  
  onSubmit() {
    this.save();
  }
  
}
 