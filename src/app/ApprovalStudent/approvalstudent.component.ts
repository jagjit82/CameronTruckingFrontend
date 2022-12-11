import { Observable } from "rxjs";
import { Component, OnInit, Inject, Input } from "@angular/core";
import { Router } from '@angular/router';
import { CommonService } from "app/common/common.service";
import { Student } from "app/student/student";
import { StudentService } from "app/student/studentservice";


@Component({
  selector: "approve-student",
  templateUrl: "./approvalstudent.component.html",
  styleUrls: ["./approvalstudent.component.css"]
})
export class ApprovalStudentComponent implements OnInit {
  @Input()
  students: Observable<Student[]>;
  student:Student = new Student();
  role:string;
  company:string;
  sortField:string="id";
  sortOrder:string="descending";
  public references: { [key: string]:string; }[] = [
    { Name: 'Walk In', Code: 'Walk In' },
    { Name: 'Online', Code: 'Online' },
    { Name: 'Newspaper', Code: 'Newspaper' },
    { Name: 'Friends', Code: 'Friends' },
    { Name: 'Instructors', Code: 'Instructors' },
    ];
  constructor(private studentService: StudentService,private commonService:CommonService,
    private router: Router) {}

  pageNum:number=0;
  totalPages:number=0;
  

  ngOnInit() {
    this.role=sessionStorage.getItem('role');
    this.pageNum=0;
    this.reloadData();
  }

  reloadData() {
    this.company=sessionStorage.getItem("company");
    this.students = this.studentService.allapprovals(this.company);
    console.log(this.students);
  }
   
  
  deleteStudent(id: number) {
    this.studentService.deleteStudent(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  rejectStudent(id: number) {
    this.studentService.rejectstudent(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  
}

