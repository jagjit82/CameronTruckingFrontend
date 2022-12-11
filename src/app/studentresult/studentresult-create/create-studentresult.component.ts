
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
import { StudentResult } from '../studentresult';

@Component({
  selector: 'app-create-studentResult',
  templateUrl: './create-studentResult.component.html',
  styleUrls: ['./create-studentResult.component.css']
})
export class CreatestudentResultComponent implements OnInit {
  students:Observable<Student[]>;
  studentResult: StudentResult = new StudentResult();
  submitted = false;
  company:string;
  showAmount:boolean=false;
  balanceAmountService:number;
  balanceAmount:number;
  totalAmount:number;
  pageNum:number=0;
  sortField:string="id";
	sortOrder:string="descending";
  public result: { [key: string]:string; }[] = [
    { Name: 'Pass', Code: 'Pass' },
    { Name: 'Fail', Code: 'Fail' },
    ];

  constructor(private router: Router,private studentService:StudentService,private companyService:CompanyService,private instructorService:InstructorService,private truckService:VehicleService,
    private route: ActivatedRoute,private commonService:CommonService) { 
      this.route.queryParams
      .filter(params => params.page)
      .subscribe(params => {
        console.log(params); // {order: "popular"}
       this.pageNum = params.page;
        
      });
    }

  ngOnInit() {
    this.company=sessionStorage.getItem("company");
    this.students = this.studentService.getStudents(this.company);
   
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.studentService.getStudentResult(id).subscribe(data => {
        this.studentResult= data;
        });
      });
    }
  
      save() {
    //this.studentResult.status=true;
    if(this.studentResult.id!=null){
      this.studentService.updateStudentResult(this.studentResult).subscribe(data => {console.log(data),this.commonService.showNotification('top','center',"Hurray! "+sessionStorage.getItem('username')+" - Your Fleet Log has been updated successfully!."),this.studentResult=new StudentResult()}, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!.")});
    }else{
    this.studentService.createStudentResult(this.studentResult)
    .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',"Hurray! "+sessionStorage.getItem('username')+" - Your Student Result has been created successfully!."),this.studentResult=new StudentResult()}, error => {console.log(error),this.commonService.showErrorNotification('top','center'," Something went wrong!." +error)});
    this.studentResult = new StudentResult();
    }
    this.router.navigate(['/studentResults']);
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
 