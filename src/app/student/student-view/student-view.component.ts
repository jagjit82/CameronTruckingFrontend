import { Observable } from "rxjs";
import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../studentservice';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Student } from "../student";


@Component({
  selector: "app-student-view",
  templateUrl: "./student-view.component.html",
  styleUrls: ["./student-view.component.css"]
})
export class StudentViewComponent implements OnInit {
  student: Student = new Student();
  modifiedByUser:string;
  postDiscount:number;
  constructor(private studentService: StudentService,
    private route: ActivatedRoute,
 ) {
      
    }

    
  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
        this.studentService.getStudent(id).subscribe(data => {
        this.student= data;
        this.calculateNetPay();
        });
      });
    
  }

  reloadData() {
    
  }
  
  calculateNetPay():void{
    this.postDiscount=this.student.totalAmount-(this.student.totalAmount*this.student.discount/100);
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
}
