
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { InstructorService } from 'app/instructor/instructorservice';
import { CommonService } from 'app/common/common.service';
import { Vehicle } from 'app/vehicle/vehicle';
import { VehicleService } from 'app/vehicle/service/vehicle.service';
import { CompanyService } from 'app/company/companyservice';
import { Student } from 'app/student/student';
import { StudentService } from 'app/student/studentservice';
import { StudentLog } from '../studentlog';
import { GenericDTO } from 'app/common/genericDTO';
import { Instructor } from 'app/instructor/instructor';

@Component({
  selector: 'app-create-studentLog',
  templateUrl: './create-studentLog.component.html',
  styleUrls: ['./create-studentLog.component.css']
})
export class CreatestudentLogComponent implements OnInit {
  students:Observable<Student[]>;
  studentLog: StudentLog = new StudentLog();
  submitted = false;
  company:string;
  showAmount:boolean=false;
  balanceAmountService:number;
  balanceAmount:number;
  instructors: Observable<Instructor[]>;
  genericDTO:GenericDTO= new GenericDTO();

  totalAmount:number;
  sortField:string="id";
	sortOrder:string="descending";
  public result: { [key: string]:string; }[] = [
    { Name: 'Pass', Code: 'Pass' },
    { Name: 'Fail', Code: 'Fail' },
    ];

  constructor(private router: Router,private studentService:StudentService,private companyService:CompanyService,private instructorService:InstructorService,private truckService:VehicleService,
    private route: ActivatedRoute,private commonService:CommonService) { }

  ngOnInit() {
    this.company=sessionStorage.getItem("company");
    this.students = this.studentService.getStudents(this.company);
    this.genericDTO.company=this.company;
    this.instructors = this.instructorService.getInstructorsListPage(this.genericDTO);
 
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.studentService.getStudentLog(id).subscribe(data => {
        this.studentLog= data;
        });
      });
    }
  
      save() {
    //this.studentLog.status=true;
    if(this.studentLog.id!=null){
      this.studentService.updateStudentLog(this.studentLog).subscribe(data => {console.log(data),this.commonService.showNotification('top','center',"Hurray! "+sessionStorage.getItem('username')+" - Your Fleet Log has been updated successfully!."),this.studentLog=new StudentLog()}, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!.")});
    }else{
    this.studentService.createStudentLog(this.studentLog)
    .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',"Hurray! "+sessionStorage.getItem('username')+" - Your Student Result has been created successfully!."),this.studentLog=new StudentLog()}, error => {console.log(error),this.commonService.showErrorNotification('top','center'," Something went wrong!." +error)});
    this.studentLog = new StudentLog();
    }
    this.router.navigate(['/studentLogs']);
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
 