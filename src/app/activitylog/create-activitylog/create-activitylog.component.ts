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
import { ActivityLog } from '../activitylog';
import { ActivityLogService } from '../service/activitylog.service';
declare var $: any;
@Component({
  selector: 'app-create-activitylog',
  templateUrl: './create-activitylog.component.html',
  styleUrls: ['./create-activitylog.component.css']
})
export class CreateActivityLogComponent implements OnInit {
  user:string=sessionStorage.getItem('username');
  activityLog: ActivityLog = new ActivityLog();
  company:string=sessionStorage.getItem("company");
  validateactivityLog: ActivityLog = new ActivityLog();
  originalactivityLog:ActivityLog = new ActivityLog();
  instructors: Observable<Instructor[]>;
  submitted = false;
  sortField:string="id";
  sortOrder:string="descending";
  genericDTO:GenericDTO= new GenericDTO();
  public categories: { [key: string]:string; }[] = [
    { Name: 'Inventory', Code: 'Inventory' },
    { Name: 'Finanace', Code: 'Finance' },
    { Name: 'Software', Code: 'Software' },
    { Name: 'Test', Code: 'Test' },
    { Name: 'Others', Code: 'Others' },
    ];

  constructor(private router: Router,private instructorService: InstructorService,private activityLogService: ActivityLogService,private companyService:CompanyService,private route: ActivatedRoute,private commonService:CommonService) { }

  ngOnInit() {
    this.genericDTO.pageNum=0;
    this.genericDTO.company=this.company;
    this.instructors = this.instructorService.getInstructorsListPage(this.genericDTO);
    this.company=sessionStorage.getItem("company");
    this.companyService.getCompany(this.company).subscribe(data=>{
      this.activityLog.company=data;
    });
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.activityLogService.getactivityLog(id).subscribe(data => {
        this.activityLog= data;
        });
      });
 
  
  }

      
  onActivityLogSelection(){
    console.log("--"+this.activityLog.id);
  }
  
  save() {
    this.activityLogService.createactivityLog(this.activityLog)
     .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',sessionStorage.getItem('username')+", Activity Log has been created successfully!."),this.activityLog=new ActivityLog()
      ;this.router.navigate(['/activityLogs']);
    }, error => {console.log(error),
      this.commonService.showErrorNotification('top','center',"Something went wrong!." +error)});
     
  
    }
    //this.activityLog = new activityLog();
  

  
  onSubmit() {
    this.save();
  }
  
}
 