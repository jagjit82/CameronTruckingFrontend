import { Observable } from "rxjs";
import { Component, OnInit, Inject, Input } from "@angular/core";
import { Router } from '@angular/router';
import { StudentService } from "app/student/studentservice";
import { StudentLog } from "../studentlog";
import { Student } from "app/student/student";


@Component({
  selector: "app-studentLog-list",
  templateUrl: "./studentLog-list.component.html",
  styleUrls: ["./studentLog-list.component.css"]
})
export class StudentLogListComponent implements OnInit {
  
  studentLogs: Observable<StudentLog[]>;
  studentLog:StudentLog = new StudentLog();
  role:string;
  company:string;
  hoursWorked:number;
  student:Student=new Student();
  students:Observable<Student[]>;
  sortField:string="id";
	sortOrder:string="descending";
  constructor(private studentService: StudentService,
    private router: Router) {}

  pageNum:number=0;
  totalPages:number=0;
  

  ngOnInit() {
    this.company=sessionStorage.getItem("company");
    this.pageNum=0;
    this.students = this.studentService.getStudents(this.company);
    this.reloadData();
  }

  reloadData() {
    this.studentLogs = this.studentService.getStudentLogListPage(this.company);
    console.log(this.studentLogs);
  }
  getHourDetails(){
     this.studentService.getStudentHoursWorked(this.student.id).subscribe(
      data=>{
        this.hoursWorked=Number(data);
      }
    );
  }

   
  
  deleteStudentLog(id: number) {
    this.studentService.deleteStudentLog(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
}

