import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CommonService } from "app/common/common.service";
import { Question } from "../question";
import { QuestionService } from "../service/question.service";
import { Employee } from "app/employee/employee";
import { EmployeeService } from "app/employee/employee.service";
import { Test } from "app/Test/test";
import { environment } from "environments/environment";

@Component({
  selector: "app-Question-list",
  templateUrl: "./question-list.component.html",
  styleUrls: ["./question-list.component.css"],
  providers:[QuestionService]
})
export class QuestionListComponent implements OnInit {
  questions: Observable<Question[]>;
  modalViewQuestions: Observable<Question[]>;
  question:Question;
  question1:Question=new Question();
  test:Test=new Test();
  replyMess:Question=new Question();
  sender:Employee=new Employee();
  modalMess:Question=new Question();
  company:string=sessionStorage.getItem("company");
  loginUser:Employee;
  pageNum:number=0;
  file:File;
  totalPages:number=0;
  config:any;
  count:number=0;
  itemPerPage:number =environment.itemsperpage;
  sortField:string="id";
  sortOrder:string="descending";
  userName:string=sessionStorage.getItem("username");
  //items: any[] = [];
  constructor(private questionService: QuestionService,private commonService:CommonService,
    private router: Router,private employeeService:EmployeeService) {}

  ngOnInit() {
    //this.role=sessionStorage.getItem('role');
    //this.getPageCount();
    this.question1.test=this.test;
    this.employeeService.findByUser(this.userName).subscribe(data=>{
      this.loginUser=data;
    });
    this.reloadData();
    
  }

  pageChanged(event:any){
    this.config.currentPage = event;
    this.questionService.getquestionsListPage(this.company).subscribe(
      data=>{
        this.questions=data;
      }
    );
  }

  readQuestion(mess:Question){
    this.modalMess=mess;
    this.questionService.getQuestionsById(mess.id).subscribe(
      data=>{
        this.modalViewQuestions=data;
      }
    );
    if(mess.status=="UNREAD"){
      mess.status="READ";
      this.questionService.updatequestion(mess).subscribe(
      data=>{
        console.log();
      }
    );
  }
  }

  viewQuestion(ques:Question){
    this.question1=ques;
  }
  reloadData() {
    this.questionService.getTotalPages(this.company).subscribe(data=>{
      this.config={
      itemsPerPage: this.itemPerPage,
      currentPage: 1,
      totalItems: data
    };

    this.questionService.getquestions(this.config.currentPage,this.sortField,this.sortOrder,this.company).subscribe(
      data=>{
        this.questions=data;
      }
    );
    });
    //this.getPageCount();
    //this.questions.forEach(element => {this.items.push(element)});
    
  }
  deleteQuestion(id: number) {
    this.questionService.deletequestion(id)
      .subscribe(
        data => {
          console.log(data);
          this.commonService.showNotification('top','center',"Question has been deleted successfully!.")
          this.reloadData();
        },
        error => {console.log(error),this.commonService.showErrorNotification('top','center',"Error!!.. Can not delete Question as it is mapped with one or more Fleet Records")});
  }

  export(){
    this.questionService.exportquestionsList(this.company)
    .subscribe(data => {this.commonService.showNotification('top','center',"Exporting your records...!!!")}, error => {console.log(error),this.commonService.showErrorNotification('top','center'," Something went wrong!." +error)});  ;
  }

  onUpload(event){
    this.file= event.target.files[0];
  }
  import(){
    this.questionService.onUpload(this.file,this.company);
  }
}
  