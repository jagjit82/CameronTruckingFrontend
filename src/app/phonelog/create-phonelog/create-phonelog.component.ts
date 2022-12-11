import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'app/common/common.service';

import { CompanyService } from 'app/company/companyservice';
import { VehicleService } from 'app/vehicle/service/vehicle.service';
import { Vehicle } from 'app/vehicle/vehicle';
import { PhoneLog } from '../phonelog';
import { PhoneLogService } from '../service/phonelog.service';
import { InstructorService } from 'app/instructor/instructorservice';
import { Instructor } from 'app/instructor/instructor';
import { GenericDTO } from 'app/common/genericDTO';
declare var $: any;
@Component({
  selector: 'app-create-phonelog',
  templateUrl: './create-phonelog.component.html',
  styleUrls: ['./create-phonelog.component.css']
})
export class CreatePhoneLogComponent implements OnInit {
  user:string=sessionStorage.getItem('username');
  phoneLog: PhoneLog = new PhoneLog();
  company:string=sessionStorage.getItem("company");
  pageNum:number=0;
  validatephoneLog: PhoneLog = new PhoneLog();
  originalphoneLog:PhoneLog = new PhoneLog();
  instructors: Observable<Instructor[]>;
  submitted = false;
  sortField:string="id";
  sortOrder:string="descending";
  genericDTO:GenericDTO= new GenericDTO();
  public callerTypeLs: { [key: string]:string; }[] = [
    { Name: 'General', Code: 'General' },
    { Name: 'Student', Code: 'Student' },
    ];
    
    public statusLs: { [key: string]:string; }[] = [
      { Name: 'OPEN', Code: 'OPEN' },
      { Name: 'CLOSED', Code: 'CLOSED' },
      ];

  constructor(private router: Router,private instructorService: InstructorService,private phoneLogService: PhoneLogService,private companyService:CompanyService,private route: ActivatedRoute,private commonService:CommonService) {
      this.route.queryParams
      .filter(params => params.page)
      .subscribe(params => {
        console.log(params); // {order: "popular"}

        this.pageNum = params.page;
        
      });

   }

  ngOnInit() {
    this.genericDTO.pageNum=0;
    this.genericDTO.company=this.company;
    this.instructors = this.instructorService.getInstructorsListPage(this.genericDTO);
    this.company=sessionStorage.getItem("company");
    this.companyService.getCompany(this.company).subscribe(data=>{
      this.phoneLog.company=data;
    });
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.phoneLogService.getphoneLog(id).subscribe(data => {
        this.phoneLog= data;
        });
      });
 
  
  }

      
  onPhoneLogSelection(){
    console.log("--"+this.phoneLog.id);
  }
  
  save() {
    this.phoneLogService.createphoneLog(this.phoneLog)
     .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',sessionStorage.getItem('username')+", Instructor Training Log has been created successfully!."),this.phoneLog=new PhoneLog()
      ;this.router.navigate(['/phoneLogs'], { queryParams:{ page: this.pageNum}});
      
    }, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Something went wrong!." +error)});
     
  
    }
    //this.phoneLog = new phoneLog();
  
        
  onSubmit() {
    this.save();
  }
  
}
 