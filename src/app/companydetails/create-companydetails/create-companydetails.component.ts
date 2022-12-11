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
import { CompanyDetails } from '../companyDetails';
declare var $: any;
@Component({
  selector: 'app-create-phonelog',
  templateUrl: './create-companyDetails.component.html',
  styleUrls: ['./create-companyDetails.component.css']
})
export class CreateCompanyDetailsComponent implements OnInit {
  user:string=sessionStorage.getItem('username');
  companyDetails: CompanyDetails=new CompanyDetails();
  company:string=sessionStorage.getItem("company");
  validatecompanyDetails: CompanyDetails = new CompanyDetails();
  originalcompanyDetails:CompanyDetails = new CompanyDetails();
  instructors: Observable<Instructor[]>;
  submitted = false;
  sortField:string="id";
  sortOrder:string="descending";
  genericDTO:GenericDTO= new GenericDTO();

  

  constructor(private router: Router,private companyService:CompanyService,private route: ActivatedRoute,private commonService:CommonService) { }

  ngOnInit() {
    this.genericDTO.pageNum=0;
    this.genericDTO.company=this.company;
    this.company=sessionStorage.getItem("company");
    
    this.companyService.getCompany(this.company).subscribe(data=>{
      this.companyDetails.company=data;
    });
    this.companyService.getCompanyDetailsList(this.company).subscribe(data=>{
      if(data!=null){
        this.companyDetails=data;
      }
    });
    
  
  }

      
  
  save() {
    if(this.companyDetails.id!=null){
      this.companyService.updateCompanyDetails(this.companyDetails)
     .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',sessionStorage.getItem('username')+", Reminder  has been updated successfully!."),
      this.router.navigate(['/companyDetailss']);
    }, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Something went wrong!." +error)});
    
    }else  
    this.companyService.createCompanyDetails(this.companyDetails)
     .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',sessionStorage.getItem('username')+", Reminder has been created successfully!."),
      this.router.navigate(['/companyDetailss']);
    }, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Something went wrong!." +error)});
     
  
    }
    //this.companyDetails = new companyDetails();
  

  
  onSubmit() {
    this.save();
  }
  
}
 