import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'app/common/common.service';

import { CompanyService } from 'app/company/companyservice';
import { Vehicle } from 'app/vehicle/vehicle';
import { VehicleService } from 'app/vehicle/service/vehicle.service';
import { InstructorTraining } from '../instructortraining';
import { InstructorTrainingService } from '../service/instructortraining.service';
import { GenericDTO } from 'app/common/genericDTO';
import { Instructor } from 'app/instructor/instructor';
import { InstructorService } from 'app/instructor/instructorservice';
declare var $: any;
@Component({
  selector: 'app-edit-instructorTraining',
  templateUrl: './edit-instructorTraining.component.html',
  styleUrls: ['./edit-instructorTraining.component.css']
})
export class EditinstructorTrainingComponent implements OnInit {
  user:string=sessionStorage.getItem('username');
  instructorTraining: InstructorTraining = new InstructorTraining();
  company:string=sessionStorage.getItem("company");
  submitted = false;
  sortField:string="id";
  sortOrder:string="descending";
  genericDTO:GenericDTO= new GenericDTO();
  instructors: Observable<Instructor[]>;
  

  constructor(private router: Router,private instructorService: InstructorService ,private instructorTrainingService: InstructorTrainingService,private companyService:CompanyService,private route: ActivatedRoute,private commonService:CommonService) { }

  ngOnInit() {
    this.sortField="id";
    this.sortOrder="ascending";
    this.genericDTO.pageNum=0;
    this.genericDTO.company=this.company;
    this.instructors = this.instructorService.getInstructorsListPage(this.genericDTO);
  
   
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.instructorTrainingService.getinstructorTraining(id).subscribe(data => {
        this.instructorTraining= data;
        });
      });
 
  
      }

      
  
  
  save() {
    //this.instructorTraining.active=true;
    console.log(sessionStorage.getItem('username'));
    //if(this.instructorTraining.id!=null){
      this.instructorTrainingService.updateinstructorTraining(this.instructorTraining).subscribe(
        data => {
          this.commonService.showNotification('top','center',+this.user+
          ", Instructor Training has been updated successfully!.");
          this.instructorTraining=new InstructorTraining();
          this.router.navigate(['/instructorTrainings']);
        },
           error => {console.log(error),
            this.commonService.showErrorNotification('top','center',"Error!! Something went wrong!.")});
    
      }

  
  onSubmit() {
    this.save();
  }
  
}
 