import { Observable } from "rxjs";
import { Student } from "./../student";
npimport { Component, OnInit, Inject, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StudentService } from "../studentservice";
import { StudentSearch } from "../studentsearch";
import { CommonService } from 'app/common/common.service';
import { environment } from "environments/environment";


@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.css"]
})
export class StudentListComponent implements OnInit {
  @Input()
  students: Observable<Student[]>;
  student: Student = new Student();
  studentSearch:StudentSearch=new StudentSearch();
  role:string;
  company:string;
  file:File;
  sortField:string="id";
  sortOrder:string="descending";
  public references: { [key: string]:string; }[] = [
    { Name: 'Walk In', Code: 'Walk In' },
    { Name: 'Online', Code: 'Online' },
    { Name: 'Newspaper', Code: 'Newspaper' },
    { Name: 'Friends', Code: 'Friends' },
    { Name: 'Instructors', Code: 'Instructors' },
    ];
  
  pageNum:number=0;
  totalPages:number=0;
  config:any;
  count:number=0;
  itemPerPage:number =environment.itemsperpage;
  public result: { [key: string]:string; }[] = [
    { Name: 'Pass', Code: 'Pass' },
    { Name: 'Fail', Code: 'Fail' },
    ];
    
    constructor(private studentService: StudentService,private commonService:CommonService,
      private router: Router,private route:ActivatedRoute) {
        this.company=sessionStorage.getItem("company");
        this.route.queryParams
        .filter(params => params.page)
        .subscribe(params => {
          console.log(params); // {order: "popular"}
            this.pageNum = params.page;
        });

              } 

  ngOnInit() {
    this.role=sessionStorage.getItem('role');
    this.reloadData();
  }

  reloadData() {
    this.studentSearch.company=this.company;
    this.studentService.getTotalPages(this.company).subscribe(data=>{
      console.log(data);
      this.count=data;
    this.config={
      itemsPerPage: this.itemPerPage,
      currentPage: this.pageNum,
      totalItems: this.count
    };

    this.students = this.studentService.getStudentsListPage(this.config.currentPage,this.sortField,this.sortOrder,this.company);
    console.log(this.students);
  });
  
  }
   


  pageChanged(event){
    this.config.currentPage = event;
    this.studentSearch.pageNumber=event;
    this.students = this.studentService.getSearchStudentsListPage(this.studentSearch)
    //this.students.subscribe(data=>{this.commonService.showNotification('top','center',data.length+" Students found !!!.")})
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

  searchStudent(){
    this.studentSearch.company=this.company;
    this.studentSearch.pageNumber=0;
    this.studentService.getSearchStudentsCount(this.studentSearch).subscribe(data=>{
      this.config={
        itemsPerPage: this.itemPerPage,
        currentPage: 1,
        totalItems: data
      }
      this.commonService.showNotification('top','center',data+" Students found !!!.")
      this.students = this.studentService.getSearchStudentsListPage(this.studentSearch)
    });
    
    //this.students.subscribe(data=>{this.commonService.showNotification('top','center',data.length+" Students found !!!.")})
  
}
  reset(){
    this.studentSearch=new StudentSearch();
  }

  onUpload(event){
    this.file= event.target.files[0];
  }
  import(){
    this.studentService.onUpload(this.file,this.company).subscribe((response) => {
      console.log("000000000000000000--->"+response);
    },error=>{
        this.commonService.showNotification('top','center',"Import Successfull");
    
    }
    );
  }
  
}

