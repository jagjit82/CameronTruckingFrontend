import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'app/common/common.service';

import { CompanyService } from 'app/company/companyservice';
import { VehicleService } from 'app/vehicle/service/vehicle.service';
import { Vehicle } from 'app/vehicle/vehicle';
import { InstructorLog } from '../instructorlog';
import { InstructorService } from 'app/instructor/instructorservice';
import { Instructor } from 'app/instructor/instructor';
import { GenericDTO } from 'app/common/genericDTO';
declare var $: any;
@Component({
  selector: 'app-create-instructorlog',
  templateUrl: './create-instructorlog.component.html',
  styleUrls: ['./create-instructorlog.component.css']
})
export class CreateInstructorLogComponent implements OnInit {
  user:string=sessionStorage.getItem('username');
  instructorLog: InstructorLog = new InstructorLog();
  company:string=sessionStorage.getItem("company");
  validateinstructorLog: InstructorLog = new InstructorLog();
  originalinstructorLog:InstructorLog = new InstructorLog();
  instructors: Observable<Instructor[]>;
  submitted = false;
  sortField:string="id";
  sortOrder:string="descending";
  genericDTO:GenericDTO= new GenericDTO();
  
  
public trainingTypeList: { [key: string]:string; }[] = [
  { Name: 'In Truck', Code: 'In Truck' },
  { Name: 'In Yard', Code: 'In Yard' },
  { Name: 'ClassRoom', Code: 'ClassRoom' },
  { Name: 'AirBrake ClassRoom', Code: 'AirBrake ClassRoom' },
  { Name: 'AirBrake Practical', Code: 'AirBrake Practical' },
  ];

  

  constructor(private router: Router,private instructorService: InstructorService,private instructorLogService: InstructorService,private companyService:CompanyService,private route: ActivatedRoute,private commonService:CommonService) { }

  ngOnInit() {
    this.sortField="id";
    this.sortOrder="ascending";
    this.genericDTO.pageNum=0;
    this.genericDTO.company=this.company;
    this.instructors = this.instructorService.getInstructorsListPage(this.genericDTO);
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.instructorService.getInstructorLog(id).subscribe(data => {
        this.instructorLog= data;
        });
      });
 
  
   
  }

      
  onInstructorLogSelection(){
    console.log("--"+this.instructorLog.id);
  }
  
  save() {
    this.instructorLogService.createinstructorLog(this.instructorLog)
     .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',sessionStorage.getItem('username')+", Instructor Monitoring Log has been created successfully!."),this.instructorLog=new InstructorLog()
      ;this.router.navigate(['/instructorLogs']);
    }, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Something went wrong!." +error)});
     
  
    }
    //this.instructorLog = new instructorLog();
  

  
  onSubmit() {
    this.save();
  }
  
}
 