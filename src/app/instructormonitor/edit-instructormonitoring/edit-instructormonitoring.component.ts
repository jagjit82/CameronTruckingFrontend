import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'app/common/common.service';

import { CompanyService } from 'app/company/companyservice';
import { Vehicle } from 'app/vehicle/vehicle';
import { VehicleService } from 'app/vehicle/service/vehicle.service';
import { InstructorMonitoring } from '../instructormonitoring';
import { InstructorMonitoringService } from '../service/instructormonitoring.service';
import { GenericDTO } from 'app/common/genericDTO';
import { Instructor } from 'app/instructor/instructor';
import { InstructorService } from 'app/instructor/instructorservice';
declare var $: any;
@Component({
  selector: 'app-edit-instructorMonitoring',
  templateUrl: './edit-instructorMonitoring.component.html',
  styleUrls: ['./edit-instructorMonitoring.component.css']
})
export class EditinstructorMonitoringComponent implements OnInit {
  user:string=sessionStorage.getItem('username');
  instructorMonitoring: InstructorMonitoring = new InstructorMonitoring();
  company:string=sessionStorage.getItem("company");
  submitted = false;
  sortField:string="id";
  sortOrder:string="descending";
  genericDTO:GenericDTO= new GenericDTO();
  instructors: Observable<Instructor[]>;
  

  constructor(private router: Router,private instructorService: InstructorService ,private instructorMonitoringService: InstructorMonitoringService,private companyService:CompanyService,private route: ActivatedRoute,private commonService:CommonService) { }

  ngOnInit() {
    this.sortField="id";
    this.sortOrder="ascending";
    this.genericDTO.pageNum=0;
    this.genericDTO.company=this.company;
    this.instructors = this.instructorService.getInstructorsListPage(this.genericDTO);
  
   
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.instructorMonitoringService.getinstructorMonitoring(id).subscribe(data => {
        this.instructorMonitoring= data;
        });
      });
 
  
      }

      
  
  
  save() {
    //this.instructorMonitoring.active=true;
    console.log(sessionStorage.getItem('username'));
    //if(this.instructorMonitoring.id!=null){
      this.instructorMonitoringService.updateinstructorMonitoring(this.instructorMonitoring).subscribe(
        data => {
          this.commonService.showNotification('top','center',+this.user+
          ", Instructor Monitoring has been updated successfully!.");
          this.instructorMonitoring=new InstructorMonitoring();
          this.router.navigate(['/instructorMonitorings']);
        },
           error => {console.log(error),
            this.commonService.showErrorNotification('top','center',"Error!! Something went wrong!.")});
    
      }

  
  onSubmit() {
    this.save();
  }
  
}
 