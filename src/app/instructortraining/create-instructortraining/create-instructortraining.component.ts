import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'app/common/common.service';

import { CompanyService } from 'app/company/companyservice';
import { VehicleService } from 'app/vehicle/service/vehicle.service';
import { Vehicle } from 'app/vehicle/vehicle';
import { InstructorTraining } from '../instructortraining';
import { InstructorTrainingService } from '../service/instructortraining.service';
import { InstructorService } from 'app/instructor/instructorservice';
import { Instructor } from 'app/instructor/instructor';
import { GenericDTO } from 'app/common/genericDTO';
declare var $: any;
@Component({
  selector: 'app-create-instructortraining',
  templateUrl: './create-instructortraining.component.html',
  styleUrls: ['./create-instructortraining.component.css']
})
export class CreateInstructorTrainingComponent implements OnInit {
  user:string=sessionStorage.getItem('username');
  instructorTraining: InstructorTraining = new InstructorTraining();
  company:string=sessionStorage.getItem("company");
  validateinstructorTraining: InstructorTraining = new InstructorTraining();
  originalinstructorTraining:InstructorTraining = new InstructorTraining();
  instructors: Observable<Instructor[]>;
  submitted = false;
  sortField:string="id";
  sortOrder:string="descending";
  genericDTO:GenericDTO= new GenericDTO();

  

  constructor(private router: Router,private instructorService: InstructorService,private instructorTrainingService: InstructorTrainingService,private companyService:CompanyService,private route: ActivatedRoute,private commonService:CommonService) { }

  ngOnInit() {
    this.sortField="id";
    this.sortOrder="ascending";
    this.genericDTO.pageNum=0;
    this.genericDTO.company=this.company;
    this.instructors = this.instructorService.getInstructorsListPage(this.genericDTO);
   
  }

      
  onInstructorTrainingSelection(){
    console.log("--"+this.instructorTraining.id);
  }
  
  save() {
    this.instructorTrainingService.createinstructorTraining(this.instructorTraining)
     .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',sessionStorage.getItem('username')+", Instructor Training Log has been created successfully!."),this.instructorTraining=new InstructorTraining()
      ;this.router.navigate(['/instructorTrainings']);
    }, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Something went wrong!." +error)});
     
  
    }
    //this.instructorTraining = new instructorTraining();
  

  
  onSubmit() {
    this.save();
  }
  
}
 