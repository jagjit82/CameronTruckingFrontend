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
import { FollowUpPhone } from '../followupphone';
import { PhoneLogService } from '../service/phonelog.service';
declare var $: any;
@Component({
  selector: 'app-create-phonelog',
  templateUrl: './create-followupphone.component.html',
  styleUrls: ['./create-followupphone.component.css']
})
export class CreateFollowUpPhoneComponent implements OnInit {
  user:string=sessionStorage.getItem('username');
  followUpPhone: FollowUpPhone = new FollowUpPhone();
  company:string=sessionStorage.getItem("company");
  validatefollowUpPhone: FollowUpPhone = new FollowUpPhone();
  originalfollowUpPhone:FollowUpPhone = new FollowUpPhone();
  instructors: Observable<Instructor[]>;
  submitted = false;
  sortField:string="id";
  sortOrder:string="descending";
  genericDTO:GenericDTO= new GenericDTO();
  
  constructor(private router: Router,private phoneLogService: PhoneLogService,private companyService:CompanyService,private route: ActivatedRoute,private commonService:CommonService) { }

  ngOnInit() {
    this.genericDTO.pageNum=0;
    this.genericDTO.company=this.company;
    
    var id = this.route.params.subscribe(params => {
      var id = params['phoneLogId'];
      this.phoneLogService.getphoneLog(id).subscribe(data => {
        this.followUpPhone.phoneLog= data;
        });
     });
     var followUpId = this.route.params.subscribe(params => {
      var followUpId = params['followUpId'];
     this.phoneLogService.getfollowUpPhone(followUpId).subscribe(data => {
      this.followUpPhone= data;
      });
    });
  
  }

      
  onFollowUpPhoneSelection(){
    console.log("--"+this.followUpPhone.id);
  }
  
  save() {
    this.phoneLogService.createfollowUpPhone(this.followUpPhone)
     .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',sessionStorage.getItem('username')+", Instructor Training Log has been created successfully!."),this.followUpPhone=new FollowUpPhone()
      ;this.router.navigate(['/followUpPhones']);
    }, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Something went wrong!." +error)});
     
  
    }
    //this.followUpPhone = new followUpPhone();
  

  
  onSubmit() {
    this.save();
  }
  
}
 