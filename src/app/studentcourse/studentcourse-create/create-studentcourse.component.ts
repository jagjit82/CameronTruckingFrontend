
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
import { StudentCourse } from '../studentcourse';
import { StudentCourseDetails } from '../studentcoursedetails';

@Component({
  selector: 'app-create-studentCourse',
  templateUrl: './create-studentCourse.component.html',
  styleUrls: ['./create-studentCourse.component.css']
})
export class CreatestudentCourseComponent implements OnInit {
  students:Observable<Student[]>;
  studentCourse: StudentCourse = new StudentCourse();
  submitted = false;
  company:string;
  showAmount:boolean=false;
  balanceAmountService:number;
  balanceAmount:number;
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
   
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.studentService.getStudentCourse(id).subscribe(data => {
        this.studentCourse= data;
        });
      });
    }
  
      save() {
    //this.studentCourse.status=true;
    if(this.studentCourse.id!=null){
      this.studentService.updateStudentCourse(this.studentCourse).subscribe(data => {console.log(data),this.commonService.showNotification('top','center',sessionStorage.getItem('username')+" - Your Student Course has been updated successfully!."),this.studentCourse=new StudentCourse()}, error => {console.log(error),this.commonService.showErrorNotification('top','center',"Arrghh!! Something went wrong!.")});
    }else{
    this.studentService.createStudentCourse(this.studentCourse)
    .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',+sessionStorage.getItem('username')+" - Your Student Course has been created successfully!."),this.studentCourse=new StudentCourse()}, error => {console.log(error),this.commonService.showErrorNotification('top','center'," Something went wrong!." +error)});
    this.studentCourse = new StudentCourse();
    }
    this.router.navigate(['/studentCourses']);
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
 