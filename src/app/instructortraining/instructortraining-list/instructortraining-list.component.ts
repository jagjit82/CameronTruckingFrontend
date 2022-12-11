import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CommonService } from "app/common/common.service";
import { InstructorTraining } from "../instructortraining";
import { InstructorTrainingService } from "../service/instructortraining.service";

@Component({
  selector: "app-InstructorTraining-list",
  templateUrl: "./instructortraining-list.component.html",
  styleUrls: ["./instructortraining-list.component.css"],
  providers:[InstructorTrainingService]
})
export class InstructorTrainingListComponent implements OnInit {
  instructorTrainings: Observable<InstructorTraining[]>;
  role:string;
  InstructorTraining:InstructorTraining;
  company:string=sessionStorage.getItem("company");
  //items: any[] = [];
  pageNum:number=0;
  totalPages:number=0;
  sortField:string="id";
	sortOrder:string="descending";
  constructor(private InstructorTrainingService: InstructorTrainingService,private commonService:CommonService,
    private router: Router) {}

  ngOnInit() {
    //this.role=sessionStorage.getItem('role');
    this.pageNum=0;
    //this.getPageCount();
    this.reloadData();
    
  }

  sortById(){
    this.sortField="id";
    if(this.sortOrder==="ascending"){
      this.sortOrder="descending";
    }else{
      this.sortOrder="ascending";
    }
    //this.instructorTrainings = this.InstructorTrainingService.getInstructorTrainingsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  sortByInstructorTrainingNum(){
    console.log("inside table header")
    this.sortField="InstructorTrainingNum";
    if(this.sortOrder==="ascending"){
      this.sortOrder="descending";
    }else{
      this.sortOrder="ascending";
    }
    //this.instructorTrainings = this.InstructorTrainingService.getInstructorTrainingsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  arrayOne(n: number): any[] {
    return Array(n);
  }
  getInstructorTrainingList(pageNo:number){
    this.pageNum=pageNo;
   // this.instructorTrainings = this.InstructorTrainingService.getInstructorTrainingsListPage(pageNo,this.sortField,this.sortOrder);
  }
  

  //  transform() {
  //   let keyArr: any[] = Object.keys(this.items[0]),
  //     dataArr = [];
  //     var i=0;
  //     keyArr.forEach((key: any) => {
  //       dataArr.push(this.items[0][key]);
  //     });
  //   return dataArr;
  // }
   first(){
    this.pageNum=0;
    //this.instructorTrainings = this.InstructorTrainingService.getInstructorTrainingsListPage(this.pageNum,this.sortField,this.sortOrder);
   }
  prev(){
    this.pageNum=this.pageNum-1;
    if(this.pageNum<0){this.pageNum=0;}
    //this.instructorTrainings = this.InstructorTrainingService.getInstructorTrainingsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  next(){
    this.pageNum=this.pageNum+1;
    if(this.pageNum>=this.totalPages){this.pageNum=this.totalPages-1;}
    //this.instructorTrainings = this.InstructorTrainingService.getInstructorTrainingsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
  last(){
      this.pageNum=this.totalPages-1;
      //this.instructorTrainings = this.InstructorTrainingService.getInstructorTrainingsListPage(this.pageNum,this.sortField,this.sortOrder);
  }
   

  reloadData() {
    this.sortField="id";
    this.sortOrder="descending";
    this.InstructorTrainingService.getinstructorTrainingsListPage(0,this.sortField,this.sortOrder,this.company).subscribe(
      data=>{
        this.instructorTrainings=data;
      }
    );
    //this.getPageCount();
    //this.instructorTrainings.forEach(element => {this.items.push(element)});
    
  }
  deleteInstructorTraining(id: number) {
    this.InstructorTrainingService.deleteinstructorTraining(id)
      .subscribe(
        data => {
          console.log(data);
          this.commonService.showNotification('top','center',"Instructor Training has been deleted successfully!.")
          this.reloadData();
        },
        error => {console.log(error),this.commonService.showErrorNotification('top','center',"Error!!.. Can not delete InstructorTraining as it is mapped with one or more Fleet Records")});
  }
}
  