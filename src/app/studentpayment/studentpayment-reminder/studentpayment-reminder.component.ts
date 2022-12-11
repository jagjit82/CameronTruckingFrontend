import { Observable } from "rxjs";
import { StudentPayment } from "./../studentPayment";
import { Component, OnInit, Inject, Input } from "@angular/core";
import { Router } from '@angular/router';
import { StudentPaymentService } from "../studentPaymentservice";
import { StudentPaymentVO } from "../studentpaymentreminder";


@Component({
  selector: "app-studentPayment-list",
  templateUrl: "./studentPayment-reminder.component.html",
  styleUrls: ["./studentPayment-reminder.component.css"]
})
export class StudentPaymentListReminderComponent implements OnInit {
  @Input()
  studentPaymentReminder: Observable<StudentPaymentVO[]>;
  studentPayment:StudentPayment = new StudentPayment();
  role:string;
  sortField:string="id";
  sortOrder:string="descending";
  company:string=sessionStorage.getItem("company");

  constructor(private studentPaymentService: StudentPaymentService,
    private router: Router) {}

  pageNum:number=0;
  totalPages:number=0;
  

  ngOnInit() {
    this.role=sessionStorage.getItem('role');
    this.pageNum=0;
    this.reloadData();
  }

  reloadData() {
    this.studentPaymentReminder=this.studentPaymentService.getStudentPaymentsReminder(this.company);
      
     
    
  }
   
  
  deleteStudentPayment(id: number) {
    this.studentPaymentService.deleteStudentPayment(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
}

