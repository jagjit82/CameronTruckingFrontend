import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'app/common/common.service';

import { CompanyService } from 'app/company/companyservice';
import { VehicleService } from 'app/vehicle/service/vehicle.service';
import { Vehicle } from 'app/vehicle/vehicle';
import { InstructorMonitoring } from '../instructormonitoring';
import { InstructorMonitoringService } from '../service/instructormonitoring.service';
import { InstructorService } from 'app/instructor/instructorservice';
import { Instructor } from 'app/instructor/instructor';
import { GenericDTO } from 'app/common/genericDTO';
declare var $: any;
@Component({
  selector: 'app-create-instructormonitoring',
  templateUrl: './create-instructormonitoring.component.html',
  styleUrls: ['./create-instructormonitoring.component.css']
})
export class CreateInstructorMonitoringComponent implements OnInit {
  user:string=sessionStorage.getItem('username');
  instructorMonitoring: InstructorMonitoring = new InstructorMonitoring();
  company:string=sessionStorage.getItem("company");
  validateinstructorMonitoring: InstructorMonitoring = new InstructorMonitoring();
  originalinstructorMonitoring:InstructorMonitoring = new InstructorMonitoring();
  instructors: Observable<Instructor[]>;
  submitted = false;
  sortField:string="id";
  sortOrder:string="descending";
  genericDTO:GenericDTO= new GenericDTO();

  

  constructor(private router: Router,private instructorService: InstructorService,private instructorMonitoringService: InstructorMonitoringService,private companyService:CompanyService,private route: ActivatedRoute,private commonService:CommonService) { }

  ngOnInit() {
    this.sortField="id";
    this.sortOrder="ascending";
    this.genericDTO.pageNum=0;
    this.genericDTO.company=this.company;
    this.instructors = this.instructorService.getInstructorsListPage(this.genericDTO);
   
  }

      
  onInstructorMonitoringSelection(){
    console.log("--"+this.instructorMonitoring.id);
  }
  
  save() {
    this.instructorMonitoringService.createinstructorMonitoring(this.instructorMonitoring)
     .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',sessionStorage.getItem('username')+", Instructor Monitoring Log has been created successfully!."),this.instructorMonitoring=new InstructorMonitoring()
      ;this.router.navigate(['/instructorMonitorings']);
    }, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Something went wrong!." +error)});
     
  
    }
    //this.instructorMonitoring = new instructorMonitoring();
  

  
  onSubmit() {
    this.save();
  }
  
}
 