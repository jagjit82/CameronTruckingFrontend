import { Observable } from "rxjs";
import { StudentCourse } from "./../studentCourse";
import { Component, OnInit, Inject, Input } from "@angular/core";
import { Router } from '@angular/router';
import { StudentService } from "app/student/studentservice";
import { StudentCourseDetails } from "../studentcoursedetails";
import { CommonService } from "app/common/common.service";


@Component({
  selector: "app-studentCourse-list",
  templateUrl: "./studentCourse-list.component.html",
  styleUrls: ["./studentCourse-list.component.css"]
})
export class StudentCourseListComponent implements OnInit {
  
  studentCourses: Observable<StudentCourse[]>;
  studentCourse:StudentCourse = new StudentCourse();
  studentCourseDetails:StudentCourseDetails=new StudentCourseDetails();
  studentCourseDetailList:StudentCourseDetails[]=[];
  roadTestDate:string;
  role:string;
  company:string
  sortField:string="id";
	sortOrder:string="descending";
  constructor(private studentService: StudentService,
    private router: Router,private commonService:CommonService) {}

  pageNum:number=0;
  totalPages:number=0;
  

  ngOnInit() {
    this.company=sessionStorage.getItem("company");
    this.pageNum=0;
    this.reloadData();
  }

  reloadData() {
    this.studentCourses = this.studentService.getStudentCourseListPage(this.company);
    console.log(this.studentCourses);
    
    
}
setCourseDetail(studentCourseDetails:StudentCourseDetails[]){
this.studentCourseDetailList=studentCourseDetails;
}
  populateModal(studentcour:StudentCourse){
    this.studentCourseDetails.studentCourse=studentcour;
  }
  saveStudentDetails(){
    this.studentCourseDetails.roadTestDate=this.roadTestDate;
    this.studentService.createStudentCourseDetails(this.studentCourseDetails)
    .subscribe(data => {this.roadTestDate='';
      console.log(data),this.commonService.showNotification('top','center'," Road Test Date added!."), this.reloadData(),this.studentCourseDetails=new StudentCourseDetails()}, 
      error => {console.log(error),this.commonService.showErrorNotification('top','center'," Something went wrong!." +error)});
    
  }
  close(){
    this.roadTestDate='';
  }
  
  deleteStudentCourse(id: number) {
    this.studentService.deleteStudentCourse(id)
      .subscribe(
        data => {
          console.log(data);
          this.commonService.showNotification('top','center'," Road Test Date Deleted!.");
          this.reloadData();
        },
        error => console.log(error));
  }

  deleteStudentCourseDetails(id: number) {
    this.studentService.deleteStudentCourseDetails(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
}

