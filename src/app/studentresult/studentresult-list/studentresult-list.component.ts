import { Observable } from "rxjs";
import { StudentResult } from "./../studentResult";
import { Component, OnInit, Inject, Input } from "@angular/core";
import { Router } from '@angular/router';
import { StudentService } from "app/student/studentservice";
import { environment } from "environments/environment";

 
@Component({
  selector: "app-studentResult-list",
  templateUrl: "./studentResult-list.component.html",
  styleUrls: ["./studentResult-list.component.css"]
})
export class StudentResultListComponent implements OnInit {
  
  studentResults: Observable<StudentResult[]>;
  studentResult:StudentResult = new StudentResult();
  role:string;
  company=sessionStorage.getItem("company");
  sortField:string="id";
  itemPerPage:number =environment.itemsperpage;
  sortOrder:string="descending";
  config:any;
  constructor(private studentService: StudentService,
    private router: Router) {
      this.studentService.getStudentResultCount(this.company).subscribe(data=>{
      this.totalPages=data;
      console.log("total result count is ="+this.totalPages)
    });
    }

  pageNum:number=0;
  totalPages:number=0;
  

  ngOnInit() {
    this.pageNum=0;
    this.reloadData();
  }

  reloadData() {
    this.pageNum=0;
    this.studentService.getStudentResultCount(this.company).subscribe(data=>{
      this.config={
        itemsPerPage: this.itemPerPage,
        currentPage: 1,
        totalItems: this.totalPages
      };
    this.studentResults = this.studentService.getStudentResultListPage(this.company,this.pageNum);
    });    
}

pageChanged(event){
  this.config.currentPage = event;
  this.pageNum=event;
  this.studentResults=this.studentService.getStudentResultListPage(this.company,this.pageNum);
}   
  
  deleteStudentResult(id: number) {
    this.studentService.deleteStudentResult(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
}

