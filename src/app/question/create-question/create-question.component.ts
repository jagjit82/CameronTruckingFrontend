import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'app/common/common.service';

import { CompanyService } from 'app/company/companyservice';
import { InstructorService } from 'app/instructor/instructorservice';
import { Question } from '../question';
import { QuestionService } from '../service/question.service';
import { EmployeeService } from 'app/employee/employee.service';
import { Employee } from 'app/employee/employee';
import { TestService } from 'app/Test/service/test.service';
import { Test } from 'app/Test/test';
declare var $: any;
@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {
  user:string=sessionStorage.getItem('username');
  question: Question = new Question();
  tests:Observable<Test[]>;
  company:string=sessionStorage.getItem("company");
  submitted = false;
  public corrctAnswers: { [key: string]:string; }[] = [
    { Name: 'optionA', Code: 'optionA' },
    { Name: 'optionB', Code: 'optionB' },
    { Name: 'optionC', Code: 'optionC' },
    { Name: 'optionD', Code: 'optionD' },
    ];

  constructor(private router: Router,private questionService: QuestionService,private companyService:CompanyService,private route: ActivatedRoute,private commonService:CommonService,private testService:TestService) { }

  ngOnInit() {
    this.testService.gettestsListPage(this.company).subscribe(data=>{
      this.tests=data;
    });
    this.company=sessionStorage.getItem("company");
    this.companyService.getCompany(this.company).subscribe(data=>{
    });
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.questionService.getquestion(id).subscribe(data => {
        this.question= data;
        });
      });
 
  
  }

      
  save() {
    this.questionService.createquestion(this.question)
     .subscribe(data => {console.log(data),this.commonService.showNotification('top','center',sessionStorage.getItem('username')+", Question has been sent successfully!."),this.question=new Question()
      ;this.router.navigate(['/questions']);
    }, error => {console.log(error),
      this.commonService.showErrorNotification('top','center',"Something went wrong!." +error)});
     
  
    }
    //this.question = new question();
  

  
  onSubmit() {
    this.save();
  }
  
}
 