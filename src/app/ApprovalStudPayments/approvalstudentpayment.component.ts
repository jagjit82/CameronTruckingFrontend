import { Observable } from "rxjs";
import { Component, OnInit, Inject, Input } from "@angular/core";
import { Router } from '@angular/router';
import { StudentPayment } from "app/studentpayment/studentPayment";
import { StudentPaymentService } from "app/studentpayment/studentPaymentservice";


@Component({
  selector: "approvalstudpayment",
  templateUrl: "./approvalstudentpayment.component.html",
  styleUrls: ["./approvalstudentpayment.component.css"]
})
export class ApprovalStudentPaymentComponent implements OnInit {
  @Input()
  studentPayments: Observable<StudentPayment[]>;
  studentPayment:StudentPayment = new StudentPayment();
  role:string;
  company:string;
  sortField:string="id";
	sortOrder:string="descending";
  constructor(private studentPaymentService: StudentPaymentService,
    private router: Router) {}

  pageNum:number=0;
  totalPages:number=0;
  

  ngOnInit() {
    this.role=sessionStorage.getItem('role');
    this.company=sessionStorage.getItem("company");
    this.pageNum=0;
    this.reloadData();
  }

  reloadData() {
    this.studentPayments = this.studentPaymentService.getStudentPaymentsApprovalPage(this.company);
    console.log(this.studentPayments);
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

  rejectStudentPayment(id:number){
    this.studentPaymentService.rejectStudentPayment(id)
    .subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error));
}
}

